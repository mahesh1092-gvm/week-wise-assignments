import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/author-api/articles")
      .then((res) => setArticles(res.data.payload)) // correct data access
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>All Articles</h1>

      {articles.length === 0 ? (
        <p>No articles available</p>
      ) : (
        articles.map((article) => (
          <div key={article._id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p>
              Author: {article.author?.firstName || article.author || "Unknown"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
