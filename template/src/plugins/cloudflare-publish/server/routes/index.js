module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/check",
    handler: "myController.check",
    config: {
      policies: []
    }
  },
  {
    method: "GET",
    path: "/publish",
    handler: "myController.publish",
    config: {
      policies: []
    }
  }
];
