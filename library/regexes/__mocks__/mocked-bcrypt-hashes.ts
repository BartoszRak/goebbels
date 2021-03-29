import { mockedText } from './mocked-text'

export const mockedBcryptHashes = [
  '$2b$10$Ci7iX5V4OYJGTzPx5de4zuJjJhX2lJMDu6LU6YP9vG0JKVzr5mJp.',
  '$2b$10$e2kMqOADDpD.Sx9W/LiR/uHKcd6iJCge77uJqze0siAeCBd.WbExm',
  '$2b$10$/2IsNc9T.jlP22Qv/o6.o.2c/0D72gg/5VtT7rjfrBiK0SNCbQv4e',
  '$2y$12$PEmxrth.vjPDazPWQcLs6u9GRFLJvneUkcf/vcXn8L.bzaBUKeX4W',
]

export const mockedBcryptHashesWithText = mockedBcryptHashes.map(
  (hash) => `${mockedText} ${hash} ${mockedText}`,
)

export const mockedNotBcryptHashes = [
  'c9p7udKkdbvCq3nafU6UlAy5+dU=',
  '2nSnBjqyGVhKoFFQgig5D2FgWt4=',
  '12$PEmxrth.vjPDazPWQcLs6u9GRFLJvneUkcf/vcXn8L.bzaBUKeX4W',
  'd39823sjum20m983um0a=23=c-2=3rc2',
]
