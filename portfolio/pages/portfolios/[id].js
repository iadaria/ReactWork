import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import axios from "axios";

const fetchPortfolios = (id) => {
    const query = `
      query Portfolio($id: ID) {
          portfolio (id: $id) {
              _id
              title
              jobTitle
              description
              startDate
              endDate
              company
              companyWebsite
              location
          }
        }
      `;
    const variables = { id }; //const variables = { id: id }
    return axios
      .post("http://localhost:3000/graphql", { query, variables }) //{query: query});
      .then(({ data: graph }) => graph.data)
      .then((data) => data.portfolio);
  };

const PortfolioDetail = ({ portfolio }) => {

  return (
    <BaseLayout>
      <BasePage>
        <div className="portfolio-detail">
          <div className="container">
            <div className="jumbotron">
              <h1 className="display-3">{portfolio.title}</h1>
              <p className="lead">{portfolio.jobTitle}</p>
              <p>
                <a
                  className="btn btn-lg btn-success"
                  href={portfolio.companyWebsite}
                  role="button"
                >
                  See Company
                </a>
              </p>
            </div>

            <div className="row marketing">
              <div className="col-lg-6">
                <h4 className="title">Location</h4>
                <p className="text">{portfolio.location}</p>

                <h4 className="title">Start Date</h4>
                {/* <p className="text">{formatDate(portfolio.startDate)}</p> */}
              </div>

              <div className="col-lg-6">
                {/* TODO: days later... */}
                <h4 className="title">Days</h4>
                <p className="text">{portfolio.daysOfExperience}</p>

                <h4 className="title">End Date</h4>
                <p className="text">
               {/*  {(portfolio.endDate && formatDate(portfolio.endDate)) || 
                    "Present"} */}
                </p>
              </div>
              <div className="col-md-12">
                <hr />
                <h4 className="title">Description</h4>
                <p>{portfolio.description}</p>
              </div>
            </div>
          </div>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

PortfolioDetail.getInitialProps = async ({ query }) => {
    const portfolio = await fetchPortfolios(query.id);
    return { portfolio };
};

export default PortfolioDetail;
