const spec={
  "openapi": "3.0.0",
  "info": {
    "version": "1.0",
    "title": "AtCoder Bot API"
  },
  "servers": [
    {
      "url": "localhost:8000/api"
    }
  ],
  "paths": {
    "/users": {
      "get": {
        "tags": [
          "users"
        ],
        "summary": "ユーザー一覧を取得",
        "description": "ユーザー一覧を取得する",
        "responses": {
          "200": {
            "description": "ユーザーのモデルの配列",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                },
                "example": [
                  {
                    "discordID": "100000000000000000",
                    "atcoderID": "atcoderUser1",
                    "rating": 123,
                    "solved": [
                      "abc001_a",
                      "abc003_b"
                    ]
                  },
                  {
                    "discordID": "200000000000000000",
                    "atcoderID": "atcoderUser2",
                    "rating": 456,
                    "solved": [
                      "abc010_c",
                      "abc023_a"
                    ]
                  }
                ]
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "users"
        ],
        "summary": "ユーザーの紐づけ",
        "description": "AtCoder ID と Discord ID を紐づける",
        "requestBody": {
          "description": "ユーザー",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/User"
              },
              "example": {
                "discordID": "100000000000000000",
                "atcoderID": "atcoderUser1"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "ユーザーのモデル",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                },
                "example": {
                  "discordID": "100000000000000000",
                  "atcoderID": "atcoderUser1",
                  "rating": 0,
                  "solved": []
                }
              }
            }
          }
        }
      }
    },
    "/users/{discordID}": {
      "get": {
        "tags": [
          "users"
        ],
        "summary": "ユーザーを取得",
        "description": "Discord ID からユーザーを取得する",
        "parameters": [
          {
            "name": "discordID",
            "in": "path",
            "description": "Discord ID",
            "required": true,
            "schema": {
              "type": "string",
              "example": "100000000000000000"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "ユーザーのモデル",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                },
                "example": {
                  "discordID": "100000000000000000",
                  "atcoderID": "atcoderUser1",
                  "rating": 123,
                  "solved": [
                    "abc001_a",
                    "abc003_b"
                  ]
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "users"
        ],
        "summary": "ユーザーの紐づけ解除",
        "description": "AtCoder ID と Discord ID の紐づけを解除する",
        "parameters": [
          {
            "name": "discordID",
            "in": "path",
            "description": "Discord ID",
            "required": true,
            "schema": {
              "type": "string",
              "example": "100000000000000000"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "void"
          }
        }
      }
    },
    "/servers/init": {
      "post": {
        "tags": [
          "servers"
        ],
        "summary": "サーバーを初期化",
        "description": "サーバーIDからサーバーを初期化する。必ず初めに実行してください。",
        "parameters": [
          {
            "name": "serverID",
            "in": "header",
            "description": "サーバーID",
            "required": true,
            "schema": {
              "type": "string",
              "example": "100000000000000000"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "サーバーのモデル",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Server"
                },
                "example": {
                  "serverID": "100000000000000000",
                  "members": [],
                  "dailyID": "0"
                }
              }
            }
          }
        }
      }
    },
    "/servers/members": {
      "post": {
        "tags": [
          "servers"
        ],
        "summary": "精進ユーザーを追加",
        "description": "サーバーの精進ユーザー一覧に、AtCoder ID を追加",
        "parameters": [
          {
            "name": "serverID",
            "in": "header",
            "description": "サーバーID",
            "required": true,
            "schema": {
              "type": "string",
              "example": "100000000000000000"
            }
          },
          {
            "name": "atcoderID",
            "in": "header",
            "description": "AtCoder ID",
            "required": true,
            "schema": {
              "type": "string",
              "example": "atcoderUser1"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "サーバーのモデル",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Server"
                },
                "example": {
                  "serverID": "100000000000000000",
                  "members": [
                    "atcoderUser1"
                  ],
                  "dailyID": "100000000000000000"
                }
              }
            }
          }
        }
      }
    },
    "/servers/{serverID}": {
      "get": {
        "tags": [
          "servers"
        ],
        "summary": "サーバーのモデルを取得",
        "description": "サーバーIDからサーバーのモデルを取得します。",
        "parameters": [
          {
            "name": "serverID",
            "in": "path",
            "description": "サーバーID",
            "required": true,
            "schema": {
              "type": "string",
              "example": "100000000000000000"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "サーバーのモデル",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Server"
                },
                "example": {
                  "serverID": "100000000000000000",
                  "members": [
                    "atcoderUser1"
                  ],
                  "dailyID": 100000000000000000
                }
              }
            }
          }
        }
      }
    },
    "/daily": {
      "get": {
        "tags": [
          "daily"
        ],
        "summary": "今日の一問を取得",
        "description": "今日の一問を取得",
        "responses": {
          "200": {
            "description": "今日の一問一覧",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Daily"
                },
                "example": {
                  "Gray": {
                    "problemID": "abc333_b",
                    "problemIndex": "B",
                    "contestID": "abc333",
                    "name": "Pentagon",
                    "point": 200,
                    "difficulty": 89
                  },
                  "Brown": {
                    "problemID": "abc333_b",
                    "problemIndex": "B",
                    "contestID": "abc333",
                    "name": "Pentagon",
                    "point": 200,
                    "difficulty": 89
                  },
                  "Green": {
                    "problemID": "abc333_b",
                    "problemIndex": "B",
                    "contestID": "abc333",
                    "name": "Pentagon",
                    "point": 200,
                    "difficulty": 89
                  },
                  "Cyan": {
                    "problemID": "abc333_b",
                    "problemIndex": "B",
                    "contestID": "abc333",
                    "name": "Pentagon",
                    "point": 200,
                    "difficulty": 89
                  },
                  "Blue": {
                    "problemID": "abc333_b",
                    "problemIndex": "B",
                    "contestID": "abc333",
                    "name": "Pentagon",
                    "point": 200,
                    "difficulty": 89
                  },
                  "Yellow": {
                    "problemID": "abc333_b",
                    "problemIndex": "B",
                    "contestID": "abc333",
                    "name": "Pentagon",
                    "point": 200,
                    "difficulty": 89
                  },
                  "Orange": {
                    "problemID": "abc333_b",
                    "problemIndex": "B",
                    "contestID": "abc333",
                    "name": "Pentagon",
                    "point": 200,
                    "difficulty": 89
                  },
                  "Red": {
                    "problemID": "abc333_b",
                    "problemIndex": "B",
                    "contestID": "abc333",
                    "name": "Pentagon",
                    "point": 200,
                    "difficulty": 89
                  }
                }
              }
            }
          }
        }
      }
    },
    "/results/server/{serverID}": {
      "get": {
        "tags": [
          "results"
        ],
        "summary": "精進記録を取得",
        "description": "サーバーIDから精進記録を取得",
        "parameters": [
          {
            "name": "serverID",
            "in": "path",
            "description": "サーバーID",
            "required": true,
            "schema": {
              "type": "string",
              "example": "100000000000000000"
            }
          },
          {
            "name": "from",
            "in": "query",
            "description": "始め",
            "required": false,
            "schema": {
              "type": "number",
              "example": 1703332800
            }
          },
          {
            "name": "to",
            "in": "query",
            "description": "終わり",
            "required": false,
            "schema": {
              "type": "number",
              "example": 1703927083
            }
          }
        ],
        "responses": {
          "200": {
            "description": "精進記録",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "serverID": {
                      "type": "string"
                    },
                    "from": {
                      "type": "number"
                    },
                    "to": {
                      "type": "number"
                    },
                    "results": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Result"
                      }
                    }
                  }
                },
                "example": {
                  "serverID": "100000000000000000",
                  "from": 1703332800,
                  "to": 1703927083,
                  "results": [
                    {
                      "atcoderID": "atcoderUser1",
                      "solved": [
                        {
                          "color": "Gray",
                          "count": 3
                        },
                        {
                          "color": "Blue",
                          "count": 2
                        },
                        {
                          "color": "Red",
                          "count": 4
                        }
                      ]
                    },
                    {
                      "atcoderID": "atcoderUser2",
                      "solved": [
                        {
                          "color": "Brown",
                          "count": 4
                        },
                        {
                          "color": "Green",
                          "count": 2
                        },
                        {
                          "color": "Yellow",
                          "count": 4
                        }
                      ]
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/results/user/{atcoderID}": {
      "get": {
        "tags": [
          "results"
        ],
        "summary": "精進記録を取得",
        "description": "AtCoder ID から精進記録を取得",
        "parameters": [
          {
            "name": "atcoderID",
            "in": "path",
            "description": "AtCoder ID",
            "required": true,
            "schema": {
              "type": "string",
              "example": "atcoderUser1"
            }
          },
          {
            "name": "from",
            "in": "query",
            "description": "始め",
            "required": false,
            "schema": {
              "type": "number",
              "example": 1703332800
            }
          },
          {
            "name": "to",
            "in": "query",
            "description": "終わり",
            "required": false,
            "schema": {
              "type": "number",
              "example": 1703927083
            }
          }
        ],
        "responses": {
          "200": {
            "description": "精進記録",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "from": {
                      "type": "number"
                    },
                    "to": {
                      "type": "number"
                    },
                    "result": {
                      "$ref": "#/components/schemas/Result"
                    }
                  }
                },
                "example": {
                  "from": 1703332800,
                  "to": 1703927083,
                  "result": {
                    "atcoderID": "atcoderUser1",
                    "solved": [
                      {
                        "color": "Gray",
                        "count": 3
                      },
                      {
                        "color": "Blue",
                        "count": 2
                      },
                      {
                        "color": "Red",
                        "count": 4
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      }
    },
    "/results/contest/{contestID}": {
      "get": {
        "tags": [
          "results"
        ],
        "summary": "ユーザーのコンテスト結果を取得",
        "description": "ユーザーのコンテスト結果を取得",
        "parameters": [
          {
            "name": "contestID",
            "in": "path",
            "description": "コンテストID",
            "required": true,
            "schema": {
              "type": "string",
              "example": "abc333"
            }
          },
          {
            "name": "atcoderID",
            "in": "query",
            "description": "AtCoder ID",
            "required": true,
            "schema": {
              "type": "string",
              "example": "atcoderUser1"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "コンテスト結果",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ContestResult"
                },
                "example": {
                  "contestID": "abc333",
                  "atcoderID": "atcoderUser1",
                  "solved": [
                    {
                      "problemID": "abc333_b",
                      "problemIndex": "B",
                      "contestID": "abc333",
                      "name": "Pentagon",
                      "point": 200,
                      "difficulty": 89
                    },
                    {
                      "problemID": "abc333_c",
                      "problemIndex": "C",
                      "contestID": "abc333",
                      "name": "Repunit Trio",
                      "point": 300,
                      "difficulty": 258
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/contests": {
      "get": {
        "tags": [
          "contests"
        ],
        "summary": "コンテスト一覧を取得",
        "description": "コンテスト一覧を取得",
        "parameters": [
          {
            "name": "from",
            "in": "query",
            "description": "始め",
            "required": false,
            "schema": {
              "type": "number",
              "example": 1702728000
            }
          },
          {
            "name": "to",
            "in": "query",
            "description": "終わり",
            "required": false,
            "schema": {
              "type": "number",
              "example": 1703332800
            }
          }
        ],
        "responses": {
          "200": {
            "description": "コンテストの配列 \n※開催前のコンテストのproblemsは表示されません。\n",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Contest"
                  }
                },
                "example": [
                  {
                    "contestID": "abc333",
                    "startAt": 1702728000,
                    "durationSecond": 6000,
                    "problems": [
                      {
                        "problemIndex": "A",
                        "problemID": "abc333_a",
                        "name": "Three Threes ",
                        "point": 100
                      },
                      {
                        "problemIndex": "B",
                        "problemID": "abc333_b",
                        "name": "Pentagon",
                        "point": 200
                      },
                      {
                        "problemIndex": "C",
                        "problemID": "abc333_c",
                        "name": "Repunit Trio",
                        "point": 300
                      },
                      {
                        "problemIndex": "D",
                        "problemID": "abc333_d",
                        "name": "Erase Leaves",
                        "point": 400
                      },
                      {
                        "problemIndex": "E",
                        "problemID": "abc333_e",
                        "name": "Takahashi Quest",
                        "point": 450
                      },
                      {
                        "problemIndex": "F",
                        "problemID": "abc333_f",
                        "name": "Bomb Game 2",
                        "point": 550
                      },
                      {
                        "problemIndex": "G",
                        "problemID": "abc333_g",
                        "name": "Nearest Fraction",
                        "point": 625
                      }
                    ]
                  },
                  {
                    "contestID": "abc334",
                    "startAt": 1703332800,
                    "durationSecond": 6000
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "User": {
        "type": "object",
        "required": [
          "discordID",
          "atcoderID"
        ],
        "properties": {
          "discordID": {
            "type": "string"
          },
          "atcoderID": {
            "type": "string"
          },
          "rating": {
            "type": "number"
          },
          "solved": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "Result": {
        "type": "object",
        "required": [
          "atcoderID",
          "colors"
        ],
        "properties": {
          "atcoderID": {
            "type": "string"
          },
          "solved": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "color": {
                  "type": "string"
                },
                "count": {
                  "type": "number"
                }
              }
            }
          }
        }
      },
      "ContestResult": {
        "type": "object",
        "required": [
          "contestID",
          "atcoderID",
          "solved"
        ],
        "properties": {
          "contestID": {
            "type": "string"
          },
          "atcoderID": {
            "type": "string"
          },
          "solved": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Problem"
            }
          }
        }
      },
      "Contest": {
        "type": "object",
        "required": [
          "contestID",
          "startAt",
          "durationSecond"
        ],
        "properties": {
          "contestID": {
            "type": "string"
          },
          "startAt": {
            "type": "number"
          },
          "durationSecond": {
            "type": "number"
          },
          "problems": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Problem"
            }
          }
        }
      },
      "Server": {
        "type": "object",
        "required": [
          "serverID",
          "members"
        ],
        "properties": {
          "serverID": {
            "type": "string"
          },
          "members": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "dailyID": {
            "type": "string"
          }
        }
      },
      "Problem": {
        "type": "object",
        "properties": {
          "problemID": {
            "type": "string"
          },
          "problemIndex": {
            "type": "string"
          },
          "contestID": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "point": {
            "type": "number"
          },
          "difficulty": {
            "type": "number"
          }
        }
      },
      "Daily": {
        "type": "object",
        "properties": {
          "Gray": {
            "$ref": "#/components/schemas/Problem"
          },
          "Brown": {
            "$ref": "#/components/schemas/Problem"
          },
          "Green": {
            "$ref": "#/components/schemas/Problem"
          },
          "Cyan": {
            "$ref": "#/components/schemas/Problem"
          },
          "Blue": {
            "$ref": "#/components/schemas/Problem"
          },
          "Yellow": {
            "$ref": "#/components/schemas/Problem"
          },
          "Orange": {
            "$ref": "#/components/schemas/Problem"
          },
          "Red": {
            "$ref": "#/components/schemas/Problem"
          }
        }
      }
    }
  }
}