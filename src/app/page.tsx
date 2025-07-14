import { financeData } from "hooks/data";
import { useFinanceData } from "hooks/useFinanceData";
import { Summary } from "./component/Summary";
import { News } from "./component/News";
import { CompanyDetails } from "./component/CompanyDetails";
import { Financials } from "./component/Financials";

export default function Home() {
//  const financeData = useFinanceData('LICI:NSE');
  console.log("financeData", financeData);
  return (
    <div>
      <Summary />
      <News />
      <Financials />
      <CompanyDetails />
    </div>
  );
}
