import { financeData } from "hooks/data";
import { useFinanceData } from "hooks/useFinanceData";
import { Summary } from "./component/Summary";
import { News } from "./component/News";
import { Financials } from "./component/Financials";
import { CompanyDetails } from "./component/CompanyDetails";

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
