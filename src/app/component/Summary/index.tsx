import { financeData } from "hooks/data";

export const Summary = () => {
  return (
    <div className="w-full max-w-sm bg-card rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
        <h1 className="text-xl font-semibold text-label mb-4">Summary Node</h1>

        <div className="mb-6">
            <p className="text-4xl font-extrabold text-primary-blue leading-tight text-blue-600">{financeData.summary.stock}</p>
            <p className="text-lg font-medium text-value mt-1">{financeData.summary.exchange}</p>
        </div>

        <div className="mb-6">
            <p className="text-5xl font-bold text-value">{financeData.summary.price}</p>
        </div>

        <div className="mb-6">
            <p className="text-xl font-semibold text-value">{financeData.summary.title}</p>
        </div>

        <div>
            <p className="text-sm text-label">{financeData.summary.extensions[0]}</p>
        </div>
    </div>
  );
};
