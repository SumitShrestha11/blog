import React from 'react';
import moment from 'moment';

const PostDetail = ({ post }) => {
    const getContentFragment = (index, text, obj, type) => {
        let modifiedText = text;
        let listItems = [];

        if (obj.type === 'bulleted-list' || "numbered-list") {
          listItems = obj.children;
        }

        if (obj) {
          if (obj.bold) {
            modifiedText = (<b key={index}>{text}</b>);
          }
    
          if (obj.italic) {
            modifiedText = (<em key={index}>{text}</em>);
          }
    
          if (obj.underline) {
            modifiedText = (<u key={index}>{text}</u>);
          }
        }
    
        switch (type) {
          case 'heading-three':
            return <h3 key={index} className="text-xl font-semibold mb-4 dark:text-gray-200">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
          case 'paragraph':
            return <p key={index} className="mb-8 dark:text-gray-300">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
          case 'heading-four':
            return <h4 key={index} className="text-md font-semibold mb-4 dark:text-gray-200">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
          case 'block-quote':
            return <em key={index} className="mb-8 dark:text-gray-400">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</em>;
          case 'bulleted-list':
            return (
              <ul key={index} className="mb-8 dark:text-gray-300 list-disc ml-7">
                {listItems.map((listItem,i) => {
                  return (
                    <li key={i}>{listItem.children.map((item) => {
                      return item.children.map((item, j) => <React.Fragment key={j}>{item.text}</React.Fragment>)
                    })}
                    </li>
                  )
                }
                )}
              </ul>
            );
          case 'numbered-list':
            return (
              <ol key={index} className="mb-8 dark:text-gray-300 list-decimal ml-7">
                {listItems.map((listItem,i) => {
                  return (
                    <li key={i}>{listItem.children.map((item) => {
                      return item.children.map((item, j) => <React.Fragment key={j}>{item.text}</React.Fragment>)
                    })}
                    </li>
                  )
                }
                )}
              </ol>
            );
          case 'image':
            return (
              <img
                key={index}
                alt={obj.title}
                height={obj.height}
                width={obj.width}
                src={obj.src}
              />
            );
          default:
            return modifiedText;
        }
      };

    return (
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
            <div className="relative overflow-hidden shadow-md mb-6">
                <img 
                    src={post.featuredImage.url}
                    alt={post.title}
                    className="object-top h-full w-full rounded-t-lg"
                />
            </div>
            <div className="px-4 lg:px-0">
                <div className="flex items-center mb-8 w-full">
                    <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
                        <img 
                            alt={post.author.name}
                            height="30px"
                            width="30px"
                            className="align-middle rounded-full"
                            src={post.author.photo.url}
                        />
                        <p className="inline align-middle text-gray-700 dark:text-gray-400 ml-2 text-lg">{post.author.name}</p>
                    </div>
                    <div className="font-medium text-gray-700 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                            {moment(post.createdAt).format('MMM DD,YYYY')}
                        </span>
                    </div>
                </div>
                <h1 className="mb-8 text-3xl font-semibold dark:text-gray-200">{post.title}</h1>
                {post.content.raw.children.map((typeObj, index) => {
                    const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))
                    
                    return getContentFragment(index, children, typeObj, typeObj.type)
                })}
            </div>
        </div>
    )
}

export default PostDetail
