AWS_PROFILE = edula_minerva_$(PROJECT_ENV)

project_env_check:
	@$(eval PROJECT_ENV := $(shell read -p "ENV? (prd or stg): " ENV; echo $$ENV))
	@echo "run command in $(PROJECT_ENV)"

deploy: project_env_check
	@if [[ $(PROJECT_ENV) = 'prd' ]]; then \
		echo 'ENV => Production...' ; \
		npm run build:prd ; \
	    aws s3 cp ./build s3://minerva-tech.info/ --recursive --acl public-read --cache-control "max-age=604800" --profile=${AWS_PROFILE} ; \
		aws cloudfront create-invalidation --distribution-id E2966GM9NK43SR --paths '/*' --profile $(AWS_PROFILE) ; \
	 else \
	 	echo 'ENV => Staging...' ; \
		npm run build:stg ; \
	    aws s3 cp ./build s3://staging.minerva-tech.info/ --recursive --acl public-read --cache-control "max-age=604800" --profile=${AWS_PROFILE} ; \
	    aws cloudfront create-invalidation --distribution-id E3RPA7Y1G7FBPW --paths '/*' --profile $(AWS_PROFILE) ; \
	 fi
	@echo 'SUCCESS!'

deploy_mock:
	@@npm run build:dev
	@aws s3 cp ./build s3://mock.minerva-tech.info/ --recursive --acl public-read --cache-control "max-age=604800" --profile=atolas_yest-works_stg
	@echo 'Exec cache clear...'
	@aws cloudfront create-invalidation --distribution-id EUN0T3NS36C1K --paths '/*' --profile fpnet_ghidorah_stg

