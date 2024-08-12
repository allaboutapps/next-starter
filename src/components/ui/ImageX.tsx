"use client";

import { debug } from "@/util/debug";
import Image, { ImageLoaderProps } from "next/image";
import type { ComponentProps } from "react";

type ImageProps = ComponentProps<typeof Image>;

// ImageX is a drop in replacement for NextJS Image
// It adds support for source sets provided by the Craft CMS image-x plugin
// Since NextJS Image does not support srcset, we have to implement it ourselves
// by choosing the best image based on the requested width using a custom loader
export const ImageX = ({
    srcset,
    copyright,
    loader: _loader, // prefix with _ because unused to avoid linter warning
    ...props
}: ImageProps & { srcset?: string | null; copyright?: string | null }) => {
    const sizes = srcset
        ? srcset
              .split(",")
              .map((s) => s.trim())
              .map((s) => {
                  const [url, width] = s.split(" ");
                  // trim trailing w from size
                  const trimmedWidth = width.slice(0, -1);
                  return { url, width: parseInt(trimmedWidth) };
              })
              .sort((a, b) => a.width - b.width)
        : [];

    // For  now we ignore the quality parameter
    const imageLoader = ({ src, width, quality: _quality }: ImageLoaderProps) => {
        if (sizes.length < 1) {
            debug.error("ImageX: srcset is missing", props.src);
            return src;
        }

        if (src.endsWith(".svg")) {
            return src;
        }

        // Retrieve the base url
        const parts = src.split("/");
        if (!parts[0].startsWith("http")) {
            return src;
        }
        if (parts.length < 3) {
            return src;
        }
        const base = `${parts[0]}//${parts[2]}`;

        let found;
        // Look for the first image that is wider than requested width
        for (let i = 0; i < sizes.length; i++) {
            if (sizes[i].width >= width) {
                found = sizes[i];
                break;
            }
        }
        // None is wider -> return the widest
        if (!found) {
            found = sizes[sizes.length - 1];
        }

        // quality is ignored for now
        const url = `${base}${found.url}`;
        return url;
    };
    return (
        <div className="relative w-full h-full">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image {...props} loader={srcset ? imageLoader : undefined} />
            {!!copyright && (
                <span
                    className="
                        absolute 
                        bottom-0 
                        left-0
                        px-2
                        truncate
                        text-black
                        bg-white
                        bg-opacity-50
                        w-fit
                        max-w-full
                        copyright
                        rounded-tr-2xl
                    "
                >
                    {copyright}
                </span>
            )}
        </div>
    );
};
