// pages/index.tsx
import { FC, Fragment } from "react";
import Link from "next/link";

interface Props {}

const bruh: FC<Props> = () => (
    <Fragment>
        <h1>Hello Next.js 👋</h1>
        <div className="posts-container">
            <Link href="/posts/first-post">First post</Link>
            <Link href="/posts/second-post">Second post</Link>
        </div>
    </Fragment>
);

export default bruh;