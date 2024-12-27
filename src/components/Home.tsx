import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MemeList from "@/components/memes/MemeList";
import { SortBy } from "@/services/meme/types";
import Search from "./Search";

const capitalizeFirstLetter = (str: string) =>
	str[0].toUpperCase() + str.slice(1);

export default function Home() {
	const tabs = [
		{ name: capitalizeFirstLetter(SortBy.trending), value: SortBy.trending },
		{ name: capitalizeFirstLetter(SortBy.newest), value: SortBy.newest },
		{ name: capitalizeFirstLetter(SortBy.marketCap), value: SortBy.marketCap },
	];
	return (
		<div className="w-full">
			<div className="w-full flex gap-4 relative">
				<Tabs defaultValue={SortBy.trending} className="flex-1">
					<TabsList className="w-full mb-6 max-md:mb-3 max-md:justify-center max-md:flex-col-reverse">
						<div className="flex-1 flex flex-row items-center overflow-x-auto gap-6 max-md:gap-2 max-md:w-full">
							{tabs.map((tab) => (
								<TabsTrigger
									value={tab.value}
									key={tab.value}
									className="max-md:flex-1"
								>
									{tab.name}
								</TabsTrigger>
							))}
						</div>
						<Search />
					</TabsList>

					{tabs.map((tab) => (
						<TabsContent value={tab.value} key={tab.value}>
							<MemeList sortBy={tab.value} />
						</TabsContent>
					))}
				</Tabs>
			</div>
		</div>
	);
}
