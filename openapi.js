const spec={
  "openapi": "3.0.0",
  "info": {
    "version": "1.0",
    "title": "AtCoder Bot API"
  },
  "servers": [
    {
      "url": "localhost:8000"
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
                "example": [
                  {
                    "discordID": 100000000000000000,
                    "atcoderID": "atcoderUser1",
                    "rating": 123,
                    "solved": [
                      "abc001_a",
                      "abc003_b"
                    ]
                  },
                  {
                    "discordID": 200000000000000000,
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
      "post": {
        "tags": [
          "users"
        ],
        "summary": "ユーザーを追加",
        "description": "ユーザーを追加する",
        "requestBody": {
          "description": "追加するユーザー",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/User"
              },
              "example": {
                "discordID": 100000000000000000,
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
                  "discordID": 100000000000000000,
                  "atcoderID": "atcoderUser1",
                  "rating": "undefined",
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
              "type": "number",
              "example": 100000000000000000
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
                  "discordID": 100000000000000000,
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
              "type": "number",
              "example": 100000000000000000
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
                  "serverID": 100000000000000000,
                  "members": []
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
              "type": "number",
              "example": 100000000000000000
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
                  "serverID": 100000000000000000,
                  "members": [
                    "atcoderUser1"
                  ]
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
              "type": "number",
              "example": 100000000000000000
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
                  "serverID": 100000000000000000,
                  "members": [
                    "atcoderUser1"
                  ]
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
                    "contestID": "abc001",
                    "problemID": "abc001_a"
                  },
                  "Brown": {
                    "contestID": "abc001",
                    "problemID": "abc001_a"
                  },
                  "Green": {
                    "contestID": "abc001",
                    "problemID": "abc001_a"
                  },
                  "Cyan": {
                    "contestID": "abc001",
                    "problemID": "abc001_a"
                  },
                  "Blue": {
                    "contestID": "abc001",
                    "problemID": "abc001_a"
                  },
                  "Yellow": {
                    "contestID": "abc001",
                    "problemID": "abc001_a"
                  },
                  "Orange": {
                    "contestID": "abc001",
                    "problemID": "abc001_a"
                  },
                  "Red": {
                    "contestID": "abc001",
                    "problemID": "abc001_a"
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
              "type": "number",
              "example": 100000000000000000
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
                "example": {
                  "serverID": 100000000000000000,
                  "from": 1703332800,
                  "to": 1703927083,
                  "results": [
                    {
                      "atcoderID": "atcoderUser1",
                      "solved": {
                        "Gray": 3,
                        "Blue": 2,
                        "Red": 4
                      }
                    },
                    {
                      "atcoderID": "atcoderUser2",
                      "solved": {
                        "Brown": 2,
                        "Green": 2,
                        "Yellow": 4
                      }
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
              "type": "number",
              "example": 100000000000000000
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
                  "$ref": "#/components/schemas/Result"
                },
                "example": {
                  "from": 1703332800,
                  "to": 1703927083,
                  "result": {
                    "atcoderID": "atcoderUser1",
                    "solved": {
                      "Gray": 3,
                      "Blue": 2,
                      "Red": 4
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
        "description": "ユーザーのコンテスト結果を取得",
        "parameters": [
          {
            "name": "contestID",
            "in": "path",
            "description": "コンテストID",
            "required": true,
            "schema": {
              "type": "string",
              "example": "abc001"
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
                  "contestID": "abc001",
                  "atcoderID": "atcoderUser1",
                  "solved": [
                    "A",
                    "B",
                    "D"
                  ]
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
            "type": "number"
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
            "type": "object",
            "properties": {
              "None": {
                "type": "number"
              },
              "Gray": {
                "type": "number"
              },
              "Brown": {
                "type": "number"
              },
              "Green": {
                "type": "number"
              },
              "Cyan": {
                "type": "number"
              },
              "Blue": {
                "type": "number"
              },
              "Yellow": {
                "type": "number"
              },
              "Orange": {
                "type": "number"
              },
              "Red": {
                "type": "number"
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
              "type": "string"
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
            "type": "number"
          },
          "members": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "Daily": {
        "type": "object",
        "properties": {
          "Gray": {
            "type": "object",
            "properties": {
              "contestID": {
                "type": "string"
              },
              "problemID": {
                "type": "string"
              }
            }
          },
          "Brown": {
            "type": "object",
            "properties": {
              "contestID": {
                "type": "string"
              },
              "problemID": {
                "type": "string"
              }
            }
          },
          "Green": {
            "type": "object",
            "properties": {
              "contestID": {
                "type": "string"
              },
              "problemID": {
                "type": "string"
              }
            }
          },
          "Cyan": {
            "type": "object",
            "properties": {
              "contestID": {
                "type": "string"
              },
              "problemID": {
                "type": "string"
              }
            }
          },
          "Blue": {
            "type": "object",
            "properties": {
              "contestID": {
                "type": "string"
              },
              "problemID": {
                "type": "string"
              }
            }
          },
          "Yellow": {
            "type": "object",
            "properties": {
              "contestID": {
                "type": "string"
              },
              "problemID": {
                "type": "string"
              }
            }
          },
          "Orange": {
            "type": "object",
            "properties": {
              "contestID": {
                "type": "string"
              },
              "problemID": {
                "type": "string"
              }
            }
          },
          "Red": {
            "type": "object",
            "properties": {
              "contestID": {
                "type": "string"
              },
              "problemID": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  }
}