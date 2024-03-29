import React from 'react';

import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';

import { PostCard, Categories, Loader } from '../../components';
import Head from 'next/head';

const CategoryPost = ({ posts, category }) => {
    const router = useRouter();
    if(router.isFallback) {
        return <Loader />;
    }
    return (
        <div className="container mx-auto lg:px-10 px-4 mb-8">
            <Head>
                <title>{category.name}</title>
            </Head>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    {posts.map((post, index) => (
                        <PostCard key={index} post={post.node} />
                    ))}
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-0 lg:top-32">
                        <Categories />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CategoryPost

export async function getStaticProps({ params }) {
    const posts = await getCategoryPost(params.slug);
    const categories = await getCategories();
    const category = categories.filter(category=>category.slug===params.slug);
    
    return {
      props : {
        posts:posts,
        category:category[0]
     },
    }
}

export async function getStaticPaths() {
    const categories = await getCategories();

    return {
        paths: categories.map(({ slug }) => ({ params:{ slug }})),
        fallback: true,
    }
}