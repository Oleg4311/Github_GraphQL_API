import { ReactElement, useState } from "react";

import { useQuery as getQuery } from "@apollo/client";

import Paginator from "../../components/Paginator";
import Repos from "../../components/Repos";
import Search from "../../components/Search";
import SearchContext from "../../components/context";
import { getRepoByPages } from "../../utils/getRepoByPages";
import { MY_REPOS, GET_REPOS } from "./main.graphql";
import * as styles from "./main.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Main(): ReactElement {
  const dispatch = useDispatch();
  const lastRequest = sessionStorage.getItem("lastRequest") || "";
  const lastPage = sessionStorage.getItem("lastPage") || 1;

  //@ts-ignore
  const myList = useSelector((store) => store.myList);

  const [requestRepo, setRequestRepo] = useState<string>(lastRequest);
  const [currentPage, setPage] = useState<number>(Number(lastPage));

  const setRequest = (currentRequest: string): void => {
    sessionStorage.setItem("lastRequest", currentRequest);
    setRequestRepo(currentRequest);
  };

  const setPageRepo = (page: number): void => {
    sessionStorage.setItem("lastPage", String(page));
    setPage(page);
  };

  const { loading, error, data } = lastRequest
    ? getQuery(GET_REPOS, {
        variables: {
          getQuery: `${requestRepo} sort:stars`,
        },
      })
    : getQuery(MY_REPOS);

  if (error) {
    return <h2 className={styles.h2_error}>{error.message}</h2>;
  }

  const pages =
    data && getRepoByPages(data.search.nodes, data.search.repositoryCount);

  let allRepos = pages?.repos;

  useEffect(() => {
    if (allRepos) {
      dispatch({ type: "INIT_MY_LIST", payload: allRepos });
    }
  }, [data]);

  return (
    <SearchContext.Provider value={{ requestRepo, setRequest }}>
      <Search />

      {loading ? (
        <h3 className={styles.h3}>Loading...</h3>
      ) : (
        <>
          <Repos repos={myList[currentPage - 1]} />
          {pages.count > 1 && (
            <Paginator
              pages={pages.count}
              currentPage={currentPage}
              setPage={setPageRepo}
            />
          )}
        </>
      )}
    </SearchContext.Provider>
  );
}
