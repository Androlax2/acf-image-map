.DEFAULT_GOAL := help
.PHONY: help
help: ## Show help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: load
load: ## Dumps the autoloader
	@composer dumpautoload

.PHONY: lint
lint: ## Analyse the code
	-./vendor/bin/phpmd src,acf-image-map.php text phpmd.xml
	-./vendor/bin/phpstan analyse --memory-limit=2G
	-./vendor/bin/phpcs
	-./node_modules/.bin/eslint . --fix
	-./node_modules/.bin/stylelint '**/*.scss' --fix


.PHONY: format
format: ## Format the code
	-yarn run prettier-php
	-./vendor/bin/phpcbf
