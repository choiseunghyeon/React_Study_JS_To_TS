import React from "react"
import styled from 'styled-components'
import axios from "axios"
import NewsItem from "./NewsItem"
import usePromise from "../lib/usePromise"

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`

type NewsListProps = {
  category: string;
}


const NewsList = ({ category }: NewsListProps) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === "all" ? "" : `&category=${category}`
    return axios.get(`http://newsapi.org/v2/top-headlines?country=kr${query}`)
  }, [category]);
  if (loading) return <NewsListBlock>대기 중...</NewsListBlock>

  if (!response) return null

  if (error) {
    return <NewsListBlock>에러 발생!</NewsListBlock>
  }
  const { articles } = response.data
  return (
    <NewsListBlock>
      {articles.map( (article: any) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  )
}

export default NewsList
