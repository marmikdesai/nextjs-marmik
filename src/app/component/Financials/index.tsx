import { financeData } from "hooks/data";
import { Fragment } from "react";

export const Financials = () => {
  return (
    <div>
      <div>financials</div>
      <div>
        {financeData.financials.map((financial, index) => {
          return (
            <Fragment key={index}>
              <div>{financial.title}</div>
              <div>{financial.results[0].date}</div>
              <div>{financial.results[0].period_type}</div>
              {financial.results[0].table.map((row, key) => {
                return (
                  <Fragment key={key}>
                    <div>{row.change}</div>
                    <div>{row.description}</div>
                    <div>{row.title}</div>
                    <div>{row.value}</div>
                  </Fragment>
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
