import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="text-center py-6 bottom-0 left-0 w-full relative bg-gray-200">
      <div className="w-1/3 mx-auto">
        <div className="flex flex-row justify-around flex-wrap mb-2">
          <Link className="underline" href="/motivation">
            Motivation
          </Link>
          <a
            className="underline"
            href="https://github.com/henriquesss/estimahub"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <Link className="underline" href="/contact">
            Contact
          </Link>
          <Link className="underline" href="/status">
            Status
          </Link>
          <Link className="underline" href="/terms-of-use">
            Terms of use
          </Link>
        </div>
        <p className="text-sm">All rights reserved. Estimahub.</p>
      </div>
    </div>
  );
};
