import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

const Welcome = () => {
  const features = [
    {
      title: 'Convention over configuration',
      text: 'We want a clear way to solve most problems, if it can be solved it should be done in a repeatable way.',
    },
  ]

  return (
    <Box p={4} backgroundColor={'white'}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Welcome to Seedling</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          These important features are critical to building a great solution.
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature, id) => (
            <HStack key={id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Welcome
