import { gql } from "@apollo/client";


export const MY_REPOS = gql`
	query GetMyRepos {
		search(query: "user:Oleg4311 sort:updated-desc", type: REPOSITORY, first: 10) {
			nodes {
				... on Repository {
					id
					name
					url
					stargazers {
						totalCount
					}
					defaultBranchRef {
						target {
							... on Commit {
								committedDate
							}
						}
					}
				}
			}
		}
	}
`;

export const GET_REPOS = gql`
	query GetRepos($getQuery: String!) {
		search(query: $getQuery, type: REPOSITORY, first: 100) {
			repositoryCount
			nodes {
				... on Repository {
					id
					name
					url
					stargazers {
						totalCount
					}
					defaultBranchRef {
						target {
							... on Commit {
								committedDate
							}
						}
					}
				}
			}
		}
	}
`;
