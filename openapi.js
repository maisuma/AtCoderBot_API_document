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
      "put": {
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
            "description": "void"
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
          },
          "404": {
            "description": "ユーザーが存在しない"
          }
        }
      },
      "delete": {
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
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "serverID": "100000000000000000"
              },
              "schema": {
                "type": "object",
                "properties": {
                  "serverID": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
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
    "/servers/members/{serverID}": {
      "post": {
        "tags": [
          "servers"
        ],
        "summary": "精進ユーザーを追加",
        "description": "サーバーの精進ユーザー一覧に、Discord ID を追加",
        "parameters": [
          {
            "name": "serverID",
            "in": "path",
            "description": "Discord ID",
            "required": true,
            "schema": {
              "type": "string",
              "example": "100000000000000000"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "discordID": "100000000000000000"
              },
              "schema": {
                "type": "object",
                "properties": {
                  "discordID": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
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
                    "100000000000000000"
                  ],
                  "dailyID": "100000000000000000"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "servers"
        ],
        "summary": "精進ユーザーを削除",
        "description": "精進ユーザーを削除する。Discord ID の指定がない場合、全ユーザーを削除する。",
        "parameters": [
          {
            "name": "serverID",
            "in": "path",
            "description": "Discord ID",
            "required": true,
            "schema": {
              "type": "string",
              "example": "100000000000000000"
            }
          },
          {
            "name": "discordID",
            "in": "query",
            "description": "Discord ID",
            "required": false,
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
    "/servers/daily/{serverID}": {
      "patch": {
        "tags": [
          "servers"
        ],
        "summary": "今日の一問のメッセージIDを更新",
        "description": "今日の一問のメッセージIDを更新",
        "parameters": [
          {
            "name": "serverID",
            "in": "path",
            "description": "Discord ID",
            "required": true,
            "schema": {
              "type": "string",
              "example": "100000000000000000"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "dailyID": {
                    "type": "string"
                  }
                }
              },
              "example": {
                "dailyID": "100000000000000000"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "void"
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
                    "100000000000000000"
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
        "description": "ユーザーのコンテスト終了時の結果を取得する",
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
            "description": "コンテストの配列 \n",
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
                    "title": "トヨタ自動車プログラミングコンテスト2023#8（AtCoder Beginner Contest 333）",
                    "problems": [
                      {
                        "problemIndex": "A",
                        "problemID": "abc333_a",
                        "name": "Three Threes ",
                        "point": 100,
                        "difficulty": 12345
                      },
                      {
                        "problemIndex": "B",
                        "problemID": "abc333_b",
                        "name": "Pentagon",
                        "point": 200,
                        "difficulty": 12345
                      },
                      {
                        "problemIndex": "C",
                        "problemID": "abc333_c",
                        "name": "Repunit Trio",
                        "point": 300,
                        "difficulty": 12345
                      },
                      {
                        "problemIndex": "D",
                        "problemID": "abc333_d",
                        "name": "Erase Leaves",
                        "point": 400,
                        "difficulty": 12345
                      },
                      {
                        "problemIndex": "E",
                        "problemID": "abc333_e",
                        "name": "Takahashi Quest",
                        "point": 450,
                        "difficulty": 12345
                      },
                      {
                        "problemIndex": "F",
                        "problemID": "abc333_f",
                        "name": "Bomb Game 2",
                        "point": 550,
                        "difficulty": 12345
                      },
                      {
                        "problemIndex": "G",
                        "problemID": "abc333_g",
                        "name": "Nearest Fraction",
                        "point": 625,
                        "difficulty": 12345
                      }
                    ]
                  },
                  {
                    "contestID": "abc334",
                    "startAt": 1703332800,
                    "durationSecond": 6000,
                    "title": "ユニークビジョンプログラミングコンテスト2023 クリスマス (AtCoder Beginner Contest 334)",
                    "problems": [
                      {
                        "problemID": "abc334_a",
                        "point": 100
                      },
                      {
                        "problemID": "abc334_b",
                        "point": 250
                      },
                      {
                        "problemID": "abc334_c",
                        "point": 350
                      },
                      {
                        "problemID": "abc334_d",
                        "point": 400
                      },
                      {
                        "problemID": "abc334_e",
                        "point": 450
                      },
                      {
                        "problemID": "abc334_f",
                        "point": 550
                      },
                      {
                        "problemID": "abc334_g",
                        "point": 650
                      }
                    ]
                  }
                ]
              }
            }
          }
        }
      }
    },
    "/virtual_contests": {
      "get": {
        "tags": [
          "virtual_contests"
        ],
        "summary": "バーチャルコンテスト一覧を取得",
        "description": "バーチャルコンテスト一覧を取得",
        "parameters": [
          {
            "name": "serverID",
            "in": "query",
            "description": "サーバーID",
            "required": false,
            "schema": {
              "type": "number",
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
            "description": "バーチャルコンテストの配列",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/VirtualContest"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "virtual_contests"
        ],
        "summary": "バーチャルコンテストを作成",
        "description": "バーチャルコンテストを作成",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "startAt": {
                    "type": "number"
                  },
                  "durationSecond": {
                    "type": "number"
                  },
                  "title": {
                    "type": "string"
                  },
                  "visible": {
                    "type": "string"
                  },
                  "serverID": {
                    "type": "string"
                  },
                  "members": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "problems": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              },
              "example": {
                "startAt": 100,
                "durationSecond": 6000,
                "title": "Virtual Contest",
                "visible": "discordOnly (All)",
                "serverID": "100000000000000000",
                "members": [
                  "atcoderUser1",
                  "atcoderUser2"
                ],
                "problems": [
                  "Gray",
                  "Gray",
                  "Blue"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "バーチャルコンテスト",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/VirtualContest"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/virtual_contests/{virtualContestID}": {
      "get": {
        "tags": [
          "virtual_contests"
        ],
        "summary": "バーチャルコンテストを取得",
        "description": "バーチャルコンテストを取得",
        "parameters": [
          {
            "name": "virtualContestID",
            "in": "path",
            "required": true,
            "schema": {
              "type": "number",
              "example": 123
            }
          }
        ],
        "responses": {
          "200": {
            "description": "バーチャルコンテスト",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/VirtualContest"
                }
              }
            }
          }
        }
      }
    },
    "/virtual_contests/standings/{virtualContestID}": {
      "get": {
        "tags": [
          "virtual_contests"
        ],
        "summary": "バーチャルコンテストの順位を取得",
        "description": "バーチャルコンテストの順位を取得",
        "parameters": [
          {
            "name": "virtualContestID",
            "in": "path",
            "required": true,
            "schema": {
              "type": "number",
              "example": 123
            }
          }
        ],
        "responses": {
          "200": {
            "description": "順位表",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Standings"
                }
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
              "$ref": "#/components/schemas/Problem"
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
          "title": {
            "type": "string"
          },
          "problems": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Problem"
            }
          }
        }
      },
      "VirtualContest": {
        "type": "object",
        "properties": {
          "virtualContestID": {
            "type": "number"
          },
          "startAt": {
            "type": "number"
          },
          "durationSecond": {
            "type": "number"
          },
          "title": {
            "type": "string"
          },
          "visible": {
            "type": "string"
          },
          "serverID": {
            "type": "string"
          },
          "members": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "problems": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Problem"
            }
          }
        }
      },
      "Standings": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/Standing"
        }
      },
      "Standing": {
        "type": "object",
        "properties": {
          "atcoderID": {
            "type": "string"
          },
          "time": {
            "type": "number"
          },
          "point": {
            "type": "number"
          },
          "problems": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "problemIndex": {
                  "type": "string"
                },
                "accepted": {
                  "type": "boolean"
                },
                "penalty": {
                  "type": "number"
                },
                "time": {
                  "type": "number"
                },
                "timePenalty": {
                  "type": "number"
                },
                "point": {
                  "type": "number"
                }
              }
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
        "required": [
          "problemID"
        ],
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
          "title": {
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