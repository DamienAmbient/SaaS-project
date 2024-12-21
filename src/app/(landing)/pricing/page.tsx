"use client"

import { client } from "@/app/lib/client"
import { createCheckoutSession } from "@/app/lib/stripe"
import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "@tanstack/react-query"
import { CheckIcon } from "lucide-react"
import { useRouter } from "next/navigation"

const Page = () => {
  const { user } = useUser()
  const router = useRouter()

  const INCLUDED_FEATURES = [
    "10.000 real-time events per month",
    "10 event categories",
    "Advanced analytics and insight",
    "Priority support",
  ]

  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: async () => {
      const res = await client.payment.createCheckoutSession.$post()
      return await res.json()
    },
    onSuccess: ({ url }) => {
      if (url) router.push(url)
    },
  })

  const handleGetAccess = () => {
    if (user) {
      createCheckoutSession()
    } else {
      router.push("/sign-in?intent=upgrade")
    }
  }

  return (
    <div className="bg-brand-25 py-24 sm:py-32">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-2xl sm:text-center">
          <Heading className="text-center">Simple no-tricks pricing</Heading>
          <p className="mt-6 text-base/7 text-gray-600 max-w-prose text-center text-pretty">
            We hate subscriptions. And chances are, you are too. That&apos;s why
            we offer lifetime access to PingPanda for a one-time payment.
          </p>
        </div>

        <div className="bg-white mx-auto mt-16 rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-3xl font-heading font-semibold tracking-tight text-gray-900">
              Lifetime access
            </h3>

            <p className="mt-6 text-base/7 text-gray-600">
              Invest once in PingPanda and transform how you monitor your SaaS
              forever. Get instant alerts, track critical metrics and never miss
              a beat in your business growth.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-brand-600">
                What&apos;s included
              </h4>
              <div className="h-px flex-auto bg-gray-100"></div>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6">
              {INCLUDED_FEATURES.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <CheckIcon className="h-6 w-5 flex-none text-brand-700"></CheckIcon>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Page
