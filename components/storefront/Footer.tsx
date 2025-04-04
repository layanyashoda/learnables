import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { CalendarIcon } from "lucide-react"
import {
Avatar,
AvatarFallback,
AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="mx-auto mb-10 mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-t pt-8 text-white sm:mt-20 lg:mt-24">
          <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-white">&copy; Learnables</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://raw.githubusercontent.com/layanyashoda/learnables/refs/heads/main/Learnables%20Resources/learnables%20icon.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Learnables</h4>
            <p className="text-sm">
              A Study Material Marketplace – created by Chanuka Chamika Nethmi Bodhika and Layan  .
            </p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 size-4 opacity-70" />{" "}
              <span className="text-muted-foreground text-xs">
                January 2025
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
      </div>
    </footer>
  );
}