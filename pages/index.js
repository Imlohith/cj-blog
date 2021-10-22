import Home from "../containers/Home";
import PostPreview from "../components/PostPreview";
import MetaHead from "../components/MetaHead";
import { getAllPosts } from "../lib/api";
import HeroTitle from "../components/HeroTitle";
import HeroExcerpt from "../components/HeroExcerpt";
import metaData from "../lib/data";
import Image from 'next/image'

export default function Index({ allPosts }) {
    return (
        <Home>
            <MetaHead
                title={metaData.title}
                description={metaData.description}
                url={metaData.url}
                image={metaData.image}
            />
            <div className="flex flex-col max-w-5xl px-2 mx-auto my-4 space-y-3">
                <HeroTitle title={metaData.title} />
                <HeroExcerpt excerpt={metaData.description} />
            </div>
            <hr className="max-w-5xl px-4 mx-auto" />
            <div>
            <div className="max-w-5xl px-2 mx-auto my-2 space-y-6">
                <div className="max-w-2xl mx-auto lg:max-w-none">
                <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                    {allPosts.map((callout, key) => (
                    <div key={callout.title} className="group relative">
                        <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                        <Image
                            src={callout.coverImage}
                            width="400"
                            height="400"
                            className="w-full h-full object-center object-cover"
                        />
                        </div>
                        <h3 className="mt-6 text-sm text-gray-500">
                           <PostPreview id={callout.slug} key={key} post={callout} />
                        </h3>
                    </div>
                    ))}
                </div>
                </div>
             </div>
            </div>
        </Home>
    );
}

export async function getStaticProps() {
    const allPosts = getAllPosts([
        "tag",
        "title",
        "date",
        "slug",
        "author",
        "excerpt",
        "coverImage"
    ]);

    return {
        props: { allPosts },
    };
}
