import { FinanceDataTypes } from "hooks/financeDataType";
import { useFinanceData } from "hooks/useFinanceData";
import { Fragment, useId } from "react";

export default function Home() {
  const financeData = useFinanceData('LICI:NSE');
  const key = useId();

  return (
    <>
      <div>
        <div>summary node</div>
        <div>{financeData.summary.stock}</div>
        <div>{financeData.summary.exchange}</div>
        <div>{financeData.summary.price}</div>
        <div>{financeData.summary.title}</div>
        <div>{financeData.summary.extensions[0]}</div>
      </div>
      <div>
        <div>news_results node</div>
        <div>
          {financeData.news_results.map((result: FinanceDataTypes["news_results"])=> {
            return (
              <Fragment key={key}>
                <div>{result.snippet}</div>
                <div>{result.date}</div>
                <div>{result.link}</div>
              </Fragment>
            )
          })}

        </div>
      </div>
      <div>
        <div>financials</div>
        <div>
          {
            financeData.financials.map((financial: FinanceDataTypes["financials"]) => {
              return (
                <Fragment key={key}>
                  <div>{financial.title}</div>
                  <div>{financial.results[0].date}</div>
                  <div>{financial.results[0].period_type}</div>
                  {financial.results[0].table.map((row) => {
                    return (
                      <Fragment key={key}>
                        <div>{row.change}</div>
                        <div>{row.description}</div>
                        <div>{row.title}</div>
                        <div>{row.value}</div>
                      </Fragment>
                    )
                  })}
                </Fragment>
              )
            })
          }
        </div>
      </div>
    </>
  );
}
