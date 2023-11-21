import { Button } from "@/components/button";
import { getData, orderStatuses } from "@/lib/data";
import { capitalize, cn } from "@/lib/util";

export default async function Home() {
  const data = (await getData())?.slice(0, 10);
  return (
    <section>
      <div className="w-full flex items-start justify-start gap-x-16 gap-y-8 flex-wrap mb-20">
        <div>
          <h3 className="mb-4 font-semibold text-2xl">Order Status</h3>
          <div className="flex items-center justify-start gap-2.5 flex-wrap">
            {orderStatuses.map((status) => {
              const isChecked = status === "delivered";

              return (
                <Button
                  key={status}
                  id={status}
                  variant={isChecked ? "filled" : "unchecked"}
                >
                  <span
                    className={cn(
                      "inline-block p-1 ring-1 -ml-2",
                      isChecked && "ring-neutral-900 ring-1 bg-neutral-200",
                      !isChecked &&
                        "bg-transparent ring-neutral-300 text-neutral-300"
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>

                  <span>{capitalize(status)}</span>
                </Button>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-2xl">Sort by</h3>
          <Button>
            <span>Delivery Time</span>
            <span className="inline-block -mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Button>
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-2xl">Date Range</h3>
          <Button className="gap-3">
            <span className="inline-block -mt-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  d="m3.25,10c0-.2.08-.39.22-.53.14-.14.33-.22.53-.22h.01c.2,0,.39.08.53.22.14.14.22.33.22.53h0c0,.21-.08.4-.22.54-.14.14-.33.22-.53.22h-.01c-.2,0-.39-.08-.53-.22-.14-.14-.22-.33-.22-.53h0Zm.75,1.25c-.2,0-.39.08-.53.22-.14.14-.22.33-.22.53h0c0,.42.34.76.75.76h.01c.2,0,.39-.08.53-.22.14-.14.22-.33.22-.53h0c0-.21-.08-.4-.22-.54-.14-.14-.33-.22-.53-.22h-.01Zm1.25-1.25c0-.2.08-.39.22-.53.14-.14.33-.22.53-.22h.01c.2,0,.39.08.53.22.14.14.22.33.22.53h0c0,.21-.08.4-.22.54-.14.14-.33.22-.53.22h-.01c-.2,0-.39-.08-.53-.22-.14-.14-.22-.33-.22-.53h0Zm.75,1.25c-.2,0-.39.08-.53.22-.14.14-.22.33-.22.53h0c0,.42.34.76.75.76h.01c.2,0,.39-.08.53-.22.14-.14.22-.33.22-.53h0c0-.21-.08-.4-.22-.54-.14-.14-.33-.22-.53-.22h-.01Zm1.25-3.25c0-.2.08-.39.22-.53.14-.14.33-.22.53-.22h.01c.2,0,.39.08.53.22.14.14.22.33.22.53h0c0,.21-.08.4-.22.54-.14.14-.33.22-.53.22h-.01c-.2,0-.39-.08-.53-.22-.14-.14-.22-.33-.22-.53h0Zm.75,1.25c-.2,0-.39.08-.53.22-.14.14-.22.33-.22.53h0c0,.42.34.76.75.76h.01c.2,0,.39-.08.53-.22.14-.14.22-.33.22-.53h0c0-.21-.08-.4-.22-.54-.14-.14-.33-.22-.53-.22h-.01Zm-.75,2.75c0-.2.08-.39.22-.53.14-.14.33-.22.53-.22h.01c.2,0,.39.08.53.22.14.14.22.33.22.53h0c0,.21-.08.4-.22.54-.14.14-.33.22-.53.22h-.01c-.2,0-.39-.08-.53-.22-.14-.14-.22-.33-.22-.53h0Zm2.75-4.75c-.2,0-.39.08-.53.22-.14.14-.22.33-.22.53h0c0,.42.34.76.75.76h.01c.2,0,.39-.08.53-.22.14-.14.22-.33.22-.53h0c0-.21-.08-.4-.22-.54-.14-.14-.33-.22-.53-.22h-.01Zm-.75,2.75c0-.2.08-.39.22-.53.14-.14.33-.22.53-.22h.01c.2,0,.39.08.53.22.14.14.22.33.22.53h0c0,.21-.08.4-.22.54-.14.14-.33.22-.53.22h-.01c-.2,0-.39-.08-.53-.22-.14-.14-.22-.33-.22-.53h0Zm.75,1.25c-.2,0-.39.08-.53.22-.14.14-.22.33-.22.53h0c0,.42.34.76.75.76h.01c.2,0,.39-.08.53-.22.14-.14.22-.33.22-.53h0c0-.21-.08-.4-.22-.54-.14-.14-.33-.22-.53-.22h-.01Zm1.25-3.25c0-.2.08-.39.22-.53.14-.14.33-.22.53-.22h.01c.2,0,.39.08.53.22.14.14.22.33.22.53h0c0,.21-.08.4-.22.54-.14.14-.33.22-.53.22h-.01c-.2,0-.39-.08-.53-.22-.14-.14-.22-.33-.22-.53h0Zm.75,1.25c-.2,0-.39.08-.53.22-.14.14-.22.33-.22.53h0c0,.42.34.76.75.76h.01c.2,0,.39-.08.53-.22.14-.14.22-.33.22-.53h0c0-.21-.08-.4-.22-.54-.14-.14-.33-.22-.53-.22h-.01Z"
                  strokeWidth="0"
                />
                <path
                  d="m3.75,0c.2,0,.39.08.53.22.14.14.22.33.22.53v1.25h7V.75c0-.2.08-.39.22-.53.14-.14.33-.22.53-.22s.39.08.53.22c.14.14.22.33.22.53v1.25h.25c.73,0,1.43.29,1.94.81.52.52.81,1.22.81,1.94v11.25H0V4.75c0-.73.29-1.43.81-1.94.52-.52,1.22-.81,1.94-.81h.25V.75c0-.2.08-.39.22-.53.14-.14.33-.22.53-.22Zm10.75,5.5H1.5v9h13V5.5Z"
                  strokeWidth="0"
                />
              </svg>
            </span>
            <span>Choose Range</span>
          </Button>
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-4xl">Filtered Results</h2>
      </div>
    </section>
  );
}
