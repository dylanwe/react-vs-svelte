import { ReactNode, useState } from "react";

interface AuthFromProps {
    title: string
    submitText: string
    onSubmit: (email: string, password: string) => void
    loading: boolean
    LinkElement: ReactNode,
}

export default function AuthForm({ title, submitText, loading, onSubmit, LinkElement }: AuthFromProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return <>
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            {title}
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your
                                    email</label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type="email"
                                    name="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                    placeholder="name@company.com"
                                    required={true}
                                />
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type="password"
                                    name="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                    placeholder="••••••••"
                                    required={true}
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary w-full"
                                onClick={() => onSubmit(email, password)}
                            >
                                {submitText}
                                {loading && <span className="loading loading-spinner loading-xs"></span>}
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                {LinkElement}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}