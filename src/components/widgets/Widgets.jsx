import React from "react";
import "./widgets.scss";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Widgets = ({ type, widgetProps }) => {
  let data;
  switch (type) {
    case "subscribed":
      data = {
        title: widgetProps,
        title2: "Subscribed",
        icon: (
          <CheckCircleOutlineIcon/>
        ),
      };
      break;
      case "pending":
        data = {
            title: widgetProps,
            title2: "Pending",
            icon: (
              <CheckCircleOutlineIcon/>
            ),
        };
        break;
        case "failed":
            data = {
                title: widgetProps,
                title2: "Failed",
                icon: (
                  <CheckCircleOutlineIcon/>
                ),
            };
            break;
            default:
                break;
  }
  return (
    <div className="widgetwrapper">
      
        <div className="titlewrapper">
            <span className="titletwo">
                {data?.title2}
            </span>
            <span  className="titleone">
                {data?.title}
            </span>
        </div>
    </div>
  );
};

export default Widgets;
