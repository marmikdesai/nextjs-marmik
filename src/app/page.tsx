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
          {financeData.news_results.map((result: any)=> {
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
    </>
  );
}
