default: dev

.PHONY: dev
dev:
	./sentry -b "crystal build ./fifteenfortyfive.cr" -w "./views/**/*.slang" -w "./**/*.cr"

.PHONY: run_once
run_once:
	crystal run ./fifteenfortyfive.cr
