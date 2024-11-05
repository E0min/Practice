import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const CandleStickChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // x축: 시간 설정 (candle_date_time_kst를 파싱하여 시간 축 생성)
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.candle_date_time_kst))
      .range([0, width])
      .padding(0.2);

    // y축: 가격 설정
    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.low_price),
        d3.max(data, (d) => d.high_price),
      ])
      .range([height, 0]);

    // x축과 y축 추가
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%H:%M")))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g").call(d3.axisLeft(yScale));

    // 툴팁 설정
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "white")
      .style("border", "1px solid black")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .text("");

    svg
      .selectAll(".candle")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "candle")
      .attr("x", (d) => xScale(d.candle_date_time_kst))
      .attr("y", (d) => yScale(Math.max(d.opening_price, d.trade_price)))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) =>
        Math.abs(yScale(d.opening_price) - yScale(d.trade_price))
      )
      .attr("fill", (d) => (d.trade_price > d.opening_price ? "green" : "red"))
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible").html(`
                        <strong>날짜:</strong> ${d.candle_date_time_kst}<br>
                        <strong>시가:</strong> ${d.opening_price}<br>
                        <strong>고가:</strong> ${d.high_price}<br>
                        <strong>저가:</strong> ${d.low_price}<br>
                        <strong>종가:</strong> ${d.trade_price}
                    `);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    svg
      .selectAll(".wick")
      .data(data)
      .enter()
      .append("line")
      .attr("class", "wick")
      .attr(
        "x1",
        (d) => xScale(d.candle_date_time_kst) + xScale.bandwidth() / 2
      )
      .attr(
        "x2",
        (d) => xScale(d.candle_date_time_kst) + xScale.bandwidth() / 2
      )
      .attr("y1", (d) => yScale(d.high_price))
      .attr("y2", (d) => yScale(d.low_price))
      .attr("stroke", "black");

    return () => {
      svg.selectAll("*").remove();
      tooltip.remove();
    };
  }, [data]);

  return <svg ref={svgRef} style={{ width: "100%", height: "100%" }}></svg>;
};

export default CandleStickChart;
