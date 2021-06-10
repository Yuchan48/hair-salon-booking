import React, { useState, useEffect } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import "./dateComponent.css";

function DateComponent(props) {
  const [dateSelection, setDateSelection] = useState([]);
  const [availableTime, setAvailableTime] = useState([]);
  const [timeClick, setTimeClick] = useState(0);
  const [timeSelection, setTimeSelection] = useState([]);

  useEffect(() => {
    if (dateSelection.length > 0) {
      (async () => {
        let res = await fetch("/api/availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedDate: dateSelection,
          }),
        });
        res = await res.json();

        const times = [
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
        let timeOccupied = res.map((ele) => ele.selectedTime);
        let availability = [];
        if (timeOccupied) {
          availability = times.filter((ele) => !timeOccupied.includes(ele));
        } else {
          availability = times;
        }
        const today = new Date().toDateString();
        if (today === dateSelection) {
          const now = new Date().getTime();
          let timeToShow = availability.filter(
            (ele) => new Date(ele).getTime() > now
          );
          setAvailableTime(timeToShow);
        } else {
          setAvailableTime(availability);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateSelection]);

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
              setDateSelection(scrollDate);
              props.dateSelectionParent(scrollDate);
              setTimeClick(0);
              setTimeSelection([]);
              props.selectedTimeParent([]);
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
          setTimeClick(timeClick + 1);
          setTimeSelection(item);
          props.selectedTimeParent(item);
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
            {dateSelection.length > 0 ? dateSelection : "Select a date"}
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
          {timeSelection.length > 0 ? (
            <div className="time-item-comp">
              <h4>{timeSelection}</h4>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className="times-outer-comp">
        {timeClick === 0 ? (
          <div className="time-container-comp">
            {availableTime !== undefined
              ? availableTime.map((item, i) => timeChoice(item, i))
              : "not found"}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default DateComponent;
