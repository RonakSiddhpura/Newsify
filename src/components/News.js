// import React, { Component } from "react";
// import NewsItem from "./NewsItem";

// export class News extends Component {
//     constructor(){
//         super();
//         console.log("hewllo");
//         this.state={
//             articles:[],
//             loading:false,
//             page:1
//         }
//     }
//     async componentDidMount(){
//         let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=60262cb96d6a41f9a5c01ac91adb7183";
//         let data = await fetch(url);
//         let parseData = await data.json();
//         console.log(data)
//         this.setState({articles:parseData.articles})
//     }

//     handlePrevClick =async()=>{
//         let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=60262cb96d6a41f9a5c01ac91adb7183${this.state.page - 1}`;
//         let data = await fetch(url);
//         let parseData = await data.json();
//         console.log(data)

//         this.setState({
//             page:this.state.page - 1,
//             articles:parseData.articles
//         })
//     }

//     handleNextClick =async ()=>{
//         let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=60262cb96d6a41f9a5c01ac91adb7183${this.state.page + 1}`;
//         let data = await fetch(url);
//         let parseData = await data.json();
//         console.log(data)

//         this.setState({
//             page:this.state.page + 1,
//             articles:parseData.articles
//         })
//     }

//   render() {
//     return (
//       <div className="container my-3">
//         <h2>NewsMonkey - Top Headlines</h2>
//         <div className="row">
//           {this.state.articles.map((element)=>{
//             return <div className="col-md-3" key={element.url}>
//                     <NewsItem title={element.title} description={ element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
//                 </div>
//           })}
//         </div>
//         <div className="container d-flex justify-content-between">
//             <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
//             <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
//         </div>
//       </div>
//     );
//   }
// }

// export default News;


import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
  }

  async componentDidMount() {
    await this.fetchNewsData();
  }

  async fetchNewsData() {
    const apiKey = "60262cb96d6a41f9a5c01ac91adb7183";
    const country = "in";

    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
      const response = await fetch(url);
      const data = await response.json();

      this.setState({
        articles: data.articles,
        totalResults:data.totalResults
      });
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  }

  handlePrevClick = async () => {
    this.setState({loading:true});  
    this.setState( 
      (prevState) => ({
        page: prevState.page - 1,
      }),
      () => {
          this.fetchNewsData();
          this.setState({loading:false});
      },
    );
  };

  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/20))){
        this.setState({loading:true});
        this.setState(
            (prevState) => ({
              page: prevState.page + 1,
            }),
            () => {
              this.fetchNewsData();
              this.setState({loading:false});
            },
           
          );
        }; 
    }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {this.state.articles.map((element) => (
            <div className="col-md-3" key={element.url}>
              <NewsItem
                title={element.title}
                description={element.description}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
