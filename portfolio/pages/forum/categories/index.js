import './categories.scss';
import BaseLayout from '@/components/layouts/BaseLayout';
import { useGetForumCategories } from '@/apollo/actions';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import Link from 'next/link';

const ForumCategories = () => {
  const { data } = useGetForumCategories();
  const forumCategories = (data && data.forumCategories) || [];

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Categories</h1>
          </div>
        </div>
      </section>
      <section className="fj-category-list">
        <div className="row">
          { forumCategories.map(forumCategory =>
            <div key={forumCategory.slug} className="col-md-4">
              <div className="fj-category-container">
                <Link
                  href="/forum/categories/[slug]"
                  as={`/forum/categories/${forumCategory.slug}`}>
                  <a className="fj-category subtle-shadow no-border">
                    <div className="category-information">
                      <div className="heading gray-90">
                        {forumCategory.title}
                      </div>
                      <div className="description">
                      {forumCategory.subTitle}
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
            )
          } 
        </div>
      </section>
    </BaseLayout>
  )
}



export default withApollo(ForumCategories, {getDataFromTree});
