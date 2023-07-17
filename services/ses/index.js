module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'You have successfuly reached the SES lambda function',
        version: '1.0.0',
        input: event,
      },
      null,
      2
    ),
  };
};
