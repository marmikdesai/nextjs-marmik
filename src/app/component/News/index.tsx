import { financeData } from "hooks/data";
import { Fragment } from "react";
import Image from 'next/image';
import Link from 'next/link';

export const News = () => {
  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-3xl sm:text-4xl font-bold text-color-mid-dark">In the News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {financeData.news_results.map(
        (result, index) => {
          return (
            <Fragment key={index}>
              <Link href={result.link} className="rounded-xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer block transition hover:shadow-xl" target="_blank">
                <div className="h-48 overflow-hidden">
                  {result.thumbnail && <Image src={result.thumbnail} width="200" height="200" alt="News Image" className="w-full h-full object-cover news-item-image" />}
                </div>
                <div className="p-5">
                    <p className="text-xs font-semibold text-color-light mb-1 uppercase tracking-wide">{result.date}</p>
                    <p className="text-sm text-gray-600">
                      {result.snippet}
                    </p>
                </div>
              </Link>
            </Fragment>
          );
        },
      )}
      </div>
    </div>
  );
};
