CREATE TABLE users
(
    id                BIGINT                NOT NULL AUTO_INCREMENT,
    username          VARCHAR(256)          NOT NULL,
    password          VARCHAR(256)          NOT NULL,
    name              VARCHAR(256)          NULL     DEFAULT NULL,
    phone             VARCHAR(32)           NULL,
    email             VARCHAR(256)          NULL,
    phone_verified_at TIMESTAMP             NULL     DEFAULT NULL,
    email_verified_at TIMESTAMP             NULL     DEFAULT NULL,
    role              ENUM ('admin','user') NULL     DEFAULT 'user',
    is_active         BOOLEAN               NOT NULL DEFAULT TRUE,
    coin_1            INT                   NOT NULL DEFAULT 0,
    coin_2            INT                   NOT NULL DEFAULT 0,
    score_daily       INT                   NOT NULL DEFAULT 0,
    score_weekly      INT                   NOT NULL DEFAULT 0,
    level             INT                   NOT NULL DEFAULT 0,
    profile_pic       TEXT                  NULL     DEFAULT NULL,
    remember_token    VARCHAR(100)          NULL     DEFAULT NULL,
    created_at        TIMESTAMP             NULL     DEFAULT NULL,
    updated_at        TIMESTAMP             NULL     DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE (username),
    UNIQUE (email),
    UNIQUE (phone)
);

CREATE TABLE questions
(
    id          BIGINT                            NOT NULL AUTO_INCREMENT,
    title       VARCHAR(256)                      NULL DEFAULT NULL,
    images      TEXT                              NULL DEFAULT NULL,
    start_time  TIMESTAMP                         NULL DEFAULT NULL,
    end_time    TIMESTAMP                         NULL DEFAULT NULL,
    score       INT                               NULL DEFAULT NULL,
    tries       INT                               NULL DEFAULT NULL,
    time_type   ENUM ('daily','weekly')           NULL DEFAULT NULL,
    answer_type ENUM ('text', 'choice', 'letter') NULL DEFAULT NULL,
    choices     TEXT                              NULL DEFAULT NULL,
    letters     TEXT                              NULL DEFAULT NULL,
    letters_num VARCHAR(256)                      NULL DEFAULT NULL,
    solutions   TEXT                              NULL DEFAULT NULL,
    locale      ENUM ('en','fa')                  NULL DEFAULT NULL,
    created_at  TIMESTAMP                         NULL DEFAULT NULL,
    updated_at  TIMESTAMP                         NULL DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE answers
(
    id          BIGINT    NOT NULL AUTO_INCREMENT,
    user_id     BIGINT    NOT NULL,
    question_id BIGINT    NOT NULL,
    text        TEXT      NULL DEFAULT NULL,
    correct     BOOLEAN   NULL DEFAULT NULL,
    created_at  TIMESTAMP NULL DEFAULT NULL,
    updated_at  TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
);

CREATE TABLE hints
(
    id          BIGINT                                            NOT NULL AUTO_INCREMENT,
    question_id BIGINT                                            NOT NULL,
    type        ENUM ('image', 'choice', 'letter', 'try', 'time') NULL DEFAULT NULL,
    value       TEXT                                              NULL DEFAULT NULL,
    price       INT                                               NULL DEFAULT NULL,
    order_no    INT                                               NULL DEFAULT NULL,
    created_at  TIMESTAMP                                         NULL DEFAULT NULL,
    updated_at  TIMESTAMP                                         NULL DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
);

CREATE TABLE user_hints
(
    id         BIGINT    NOT NULL AUTO_INCREMENT,
    user_id    BIGINT    NOT NULL,
    hint_id    BIGINT    NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (hint_id) REFERENCES hints (id) ON DELETE CASCADE
);

CREATE TABLE user_level_hints
(
    id         BIGINT    NOT NULL AUTO_INCREMENT,
    user_id    BIGINT    NOT NULL,
    level_id   BIGINT    NOT NULL,
    hint_id    BIGINT    NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE achievements
(
    id         BIGINT      NOT NULL AUTO_INCREMENT,
    code       VARCHAR(64) NOT NULL,
    created_at TIMESTAMP   NULL DEFAULT NULL,
    updated_at TIMESTAMP   NULL DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE user_achievements
(
    id             BIGINT    NOT NULL AUTO_INCREMENT,
    user_id        BIGINT    NOT NULL,
    achievement_id BIGINT    NOT NULL,
    created_at     TIMESTAMP NULL DEFAULT NULL,
    updated_at     TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES achievements (id) ON DELETE CASCADE
);

CREATE TABLE news
(
    id             BIGINT    NOT NULL AUTO_INCREMENT,
    image          TEXT      NULL DEFAULT NULL,
    is_active      BOOLEAN   NOT NULL DEFAULT FALSE,
    created_at     TIMESTAMP NULL DEFAULT NULL,
    updated_at     TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id)
);
