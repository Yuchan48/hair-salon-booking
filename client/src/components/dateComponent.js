import "./dateComponent.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//component
import LoadingBox from "../components/LoadingBox";
import ErrorMessage from "../components/ErrorMessage";
import {
  availabilityBooking,
  selectedDateBooking,
  selectedTimeBooking,
} from "../redux/actions/bookingActions";
import { BOOKING_TIME_REMOVE } from "../redux/constants/bookingConstants";

function DateComponent() {
  const bookingInfo = useSelector((state) => state.bookingInfo);
  const { selectedDate, selectedTime } = bookingInfo;

  const [availableTime, setAvailableTime] = useState([]);
  const [timeClick, setTimeClick] = useState(0);

  const dispatch = useDispatch();
  const bookingAvailability = useSelector((state) => state.bookingAvailability);
  const { times, loading, error, success } = bookingAvailability;

  const selectDateHandler = (scrollDate) => {
    dispatch(selectedDateBooking(scrollDate));
    dispatch(availabilityBooking(scrollDate));
    dispatch({ type: BOOKING_TIME_REMOVE });
  };

  const selectTimeHandler = (item) => {
    dispatch(selectedTimeBooking(item));
  };

  useEffect(() => {
    if (times) {
      const openTimes = [
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
      ];
      let timeOccupied = times.map((ele) => ele.selectedTime);
      let availability = [];
      availability = timeOccupied
        ? openTimes.filter((ele) => !timeOccupied.includes(ele))
        : openTimes;

      const today = new Date().toDateString();
      const now = new Date().getTime();
      setAvailableTime(
        today === selectedDate
          ? availability.filter((ele) => new Date(ele).getTime() > now)
          : availability
      );
    }
  }, [times, selectedDate]);

  const dateChoice = () => {
    const now = new Date().getHours();
    const weekend = new Date().getDay();
    let today = new Date().getTime();
    const aDay = 86400000;

    if (now > 17 || weekend === 0) {
      today += aDay;
    } else if (weekend === 6) {
      today += aDay * 2;
    }

    let dateArr = [];
    for (let i = 0; i < 14; i++) {
      if (
        new Date(today + aDay * i).getDay() !== 0 &&
        new Date(today + aDay * i).getDay() !== 6
      ) {
        let scrollDate = new Date(today + aDay * i).toDateString();

        dateArr.push(
          <DropdownItem
            key={scrollDate}
            className="date-dropdown-item"
            onClick={() => {
              selectDateHandler(scrollDate);
              setTimeClick(1);
            }}
            style={{ height: "50px" }}
          >
            {scrollDate}
          </DropdownItem>
        );
      }
    }
    return dateArr;
  };

  const timeChoice = (item, i) => {
    return (
      <div
        className="time-items-comp"
        key={i}
        onClick={() => {
          setTimeClick(0);
          selectTimeHandler(item);
        }}
      >
        <h4>{item}</h4>
      </div>
    );
  };

  return (
    <div className="date-comp-box">
      <div className="date-comp-lines">
        <UncontrolledDropdown size="lg">
          <DropdownToggle color="danger">
            {selectedDate ? selectedDate : "Select a date"}
          </DropdownToggle>
          <DropdownMenu
            modifiers={{
              setMaxHeight: {
                enabled: true,
                order: 890,
                fn: (data) => {
                  return {
                    ...data,
                    styles: {
                      ...data.styles,
                      overflow: "auto",
                      maxHeight: "250px",
                    },
                  };
                },
              },
            }}
          >
            <h5>{dateChoice()}</h5>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div>
          {selectedTime ? (
            <div className="time-item-comp">
              <h4>{selectedTime}</h4>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className="times-outer-comp">
        {timeClick > 0 ? (
          <>
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <ErrorMessage>{error}</ErrorMessage>
            ) : success ? (
              <div className="time-container-comp">
                {availableTime.map((item, i) => timeChoice(item, i))}
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default DateComponent;
