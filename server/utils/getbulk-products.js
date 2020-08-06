const { SHOPIFY_API_VERSION } = process.env;

const getBulkProducts = async (accessToken, shop) => {
    const query = JSON.stringify({
        query: `mutation {
            bulkOperationRunQuery(
            query: """
                {
                products {
                    edges {
                    node {
                        id
                        vendor
                        productType
                        tags
                        collections {
                            edges {
                                node {
                                    title
                                    sortOrder
                                }
                            }
                        }
                        variants {
                            edges {
                                node {
                                    id
                                    displayName
                                    inventoryQuantity
                                    updatedAt
                                    image {
                                        transformedSrc
                                    }
                                }
                            }
                        }
                    }
                    }
                }
                }
                """
            ) {
                bulkOperation {
                id
                status
                }
                userErrors {
                field
                message
                }
            }
        }`,
    });

    const response = await fetch(
        `https://${shop}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': accessToken,
            },
            body: query,
        },
    );

    const responseJson = await response.json();
    const bulkOpsID = responseJson.data.bulkOperationRunQuery.bulkOperation.id;

    return bulkOpsID;
};

module.exports = getBulkProducts;
