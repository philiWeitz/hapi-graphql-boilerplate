
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color


#### style check
printf "\n"
printf "${BLUE}➤  Running eslint tests...${NC}\n"

yarn eslint
STYLE_RESULT=$?
printf "${BLUE}   done${NC}\n"


#### jest tests
printf "\n\n"
printf "${BLUE}➤  Running automated tests...${NC}\n"

yarn test
TEST_RESULT=$?
printf "${BLUE}   done${NC}\n"

#### report results
printf "\n\n"
printf "${BLUE}➤ Test Results: ${NC}\n"

if [ $STYLE_RESULT -gt 0 ]; then
  printf "${RED}  ✗ Style check failed ${NC}\n"
  RESULT=1
else
  printf "${GREEN}  ✓ Style check passed ${NC}\n"
fi

if [ $TEST_RESULT -gt 0 ]; then
  printf "${RED}  ✗ Jest tests failed ${NC}\n"
  RESULT=1
else
  printf "${GREEN}  ✓ Automated tests passed ${NC}\n"
fi


echo ""
exit $RESULT