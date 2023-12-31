import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./multiRangeSlider.css";

const MultiRangeSlider = ({ min, max, setPriceRange, filter }) => {
  const [minVal, setMinVal] = useState(filter.price.min || min);
  const [maxVal, setMaxVal] = useState(filter.price.max || max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  const updateVal = (e) => {
    let { value } = e.target;
    const { id } = e.currentTarget;
    let maxlength = max.toString().length;

    if (id === "minVal" && value < max) {
      value = value.replace(/\D/g, "");
      return setMinVal(value.substring(0, maxlength));
    }

    if (id === "maxVal" && value <= max) {
      value = value.replace(/\D/g, "");
      return setMaxVal(value.substring(0, maxlength));
    }
  };

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );
  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    setPriceRange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, setPriceRange]);

  return (
    <>
      <div className="flex items-center justify-center">
        <input
          id="minVal"
          value={minVal}
          className="border w-full my-6"
          onChange={(e) => updateVal(e)}
        />
        <div className=" w-1/6 mx-2 h-0.5 my-6 bg-black"></div>
        <input
          id="maxVal"
          value={maxVal}
          className="border w-full my-6"
          onChange={(e) => updateVal(e)}
        />
      </div>
      <div className="container">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - 100 && "5" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="thumb thumb--right"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
        </div>
      </div>
    </>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  // onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;
