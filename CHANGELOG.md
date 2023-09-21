## [1.6.1](https://github.com/BottlecapDave/Gitlab-Merge-Request-Reminder/compare/v1.6.0...v1.6.1) (2023-09-21)


### Bug Fixes

* Fixed issue when merge requests were filtered out when excluded or mandatory labels were not specified and merge requests had labels specified ([2108e39](https://github.com/BottlecapDave/Gitlab-Merge-Request-Reminder/commit/2108e39d1cb62815d0166bce7b56794848874f9e))
* Updated draft and wip filtering to use fields specified in merge request object instead of title prefixes ([2a32716](https://github.com/BottlecapDave/Gitlab-Merge-Request-Reminder/commit/2a32716d9520cdccada67e4f498dedb4351f21fb))

# [1.6.0](https://github.com/BottlecapDave/Gitlab-Merge-Request-Reminder/compare/v1.5.0...v1.6.0) (2023-07-12)

### Features

* **gitlab:** Added option to exclude merge requests with certain labels ([49632a9](https://github.com/BottlecapDave/Gitlab-Merge-Request-Reminder/commit/49632a9744cb9d7dbf3de598129873a5db982070))

# [1.5.0](https://github.com/BottlecapDave/Gitlab-Merge-Request-Reminder/compare/v1.4.0...v1.5.0) (2023-07-08)


### Bug Fixes

* Fixed error if you dont have access to project ([88059d1](https://github.com/BottlecapDave/Gitlab-Merge-Request-Reminder/commit/88059d1ff9e68eec5cd994f788942b888af89a05))

### Features

* Added support to filter merge requests by labels ([879a676](https://github.com/BottlecapDave/Gitlab-Merge-Request-Reminder/commit/879a67663a80d378dcb7a167b86046da62ffd517))

# [1.4.0](https://github.com/BottlecapDave/Gitlab-Merge-Request-Reminder/compare/v1.3.0...v1.4.0) (2022-02-19)


### Features

* Added support for custom gitlab domain ([ac6f909](https://github.com/BottlecapDave/Gitlab-Merge-Request-Reminder/commit/ac6f9099657c74284c9c94a81b138eb1e7f1d77e))

# [1.3.0](https://github.com/BottlecapDave/Gitlab-Merge-Request-Reminder/compare/v1.2.2...v1.3.0) (2021-12-22)


### Features

* use non-zero exit code on error ([a5e8680](https://github.com/BottlecapDave/Gitlab-Merge-Request-Reminder/commit/a5e8680e4851fa1650a5a117ca368b507d1c46ac))
