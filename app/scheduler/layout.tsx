import Script from "next/script";

export default function SchedulerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section>{children}</section>
      <Script src="https://apis.google.com/js/api.js" />
    </>
  );
}
