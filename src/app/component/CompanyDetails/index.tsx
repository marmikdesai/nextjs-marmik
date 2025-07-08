import { financeData } from "hooks/data";
import { Fragment } from "react";

export const CompanyDetails = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl overflow-hidden">
        <div className="bg-blue-600 p-6 sm:p-8 flex items-center justify-between rounded-t-xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">About {financeData.summary.title} ({financeData.summary.stock})</h1>
        </div>
        <div className="p-6 sm:p-8 text-gray-800 leading-relaxed">
          {
            financeData.knowledge_graph.about.map((aboutData, index)=> {
              return (
                <Fragment key={index}>
                  <div className="mb-4 text-lg">{aboutData.description.snippet}</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {aboutData.info.map((infoData, key)=> {
                      return (
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200" key={key}>
                            <span className="text-primary-blue text-2xl mr-3">&#x2139;</span>
                            <div>
                                <p className="text-sm text-gray-600 font-medium">{infoData.label}</p>
                                <p className="text-lg font-semibold text-gray-900">{infoData.value}</p>
                            </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="text-right text-sm text-gray-500 mt-6">Source: <a href={aboutData.description.link} target="_blank" className="text-primary-blue hover:underline">{aboutData.description.link_text}</a></div>
                </Fragment>
              )
            })
          }
        </div>
      </div>
    )
}