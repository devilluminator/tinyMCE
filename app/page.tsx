"use client";
import { useQuery } from "@tanstack/react-query";
import { contentsQueryOptions } from "@/context/content-query";
import HtmlContent from "@/components/html-content";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatUnixTimestamp } from "@/lib/format-date";

export default function Home() {
  const { queryFn, queryKey } = contentsQueryOptions();
  const { data, isFetching } = useQuery({
    queryKey,
    queryFn: () => queryFn(),
  });

  return (
    <div className='flex flex-col justify-center items-start gap-3 p-3 border w-full'>
      {data?.data?.map((item) => (
        <Card key={item.uuid}>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription>UUID:{item.uuid}</CardDescription>
          </CardHeader>
          <CardContent>
            <HtmlContent html={item.content} />
          </CardContent>
          <CardFooter className='rtl'>
            {formatUnixTimestamp(item.datetime)}
          </CardFooter>
        </Card>
      ))}

      <span className='font-bold text-lg'>
        {isFetching && "is fetching data"}
      </span>
    </div>
  );
}
