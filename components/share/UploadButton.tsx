"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { object, string } from "zod";
import { UrlObject } from "url";

export default function UploadButton({ language }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {language.map(
          (lang: {
            value: React.Key | null | undefined;
            link: string | UrlObject;
            name:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  unknown,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactPortal
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined;
          }) => (
            <Link key={lang.value} href={lang.link}>
              <DropdownMenuItem>{lang.name}</DropdownMenuItem>
            </Link>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
