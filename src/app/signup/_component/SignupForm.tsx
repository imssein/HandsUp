"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import Input from "@/app/_component/common/Input";
import { cn } from "@/utils/function/cn";

import Toast from "../../_component/common/Toast";
import { useIdDuplicateCheck } from "../_hooks/mutations/useIdDuplicateCheck";

type LoginFormValues = {
  email: string;
  password: string;
};

const SignupForm = () => {
  const { show } = Toast();
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<LoginFormValues>();
  const [idStatus, setIdStatus] = useState<"None" | "Change" | "Ok">("None");
  const [checkPassWord, setCheckPassWord] = useState("");

  const email = watch("email");
  const passWord = watch("password");

  const idDuplicateCheck = useIdDuplicateCheck(setIdStatus);

  useEffect(() => {
    setIdStatus("Change");
  }, [email]);

  const onSubmit = async (userAuthData: LoginFormValues) => {
    // signUpMutation.mutate(data);     @notice : 현재 회원가입 & 온보딩 api가 통합되어있어 분리되기전까지 회원가입 폼 전부 입력시 온보딩 페이지로 이동
    router.push(
      `/onboarding?id=${userAuthData.email}&password=${userAuthData.password}`
    );
  };

  const onFormInValid = (error: FieldErrors) => {
    const errorMessage = error[Object.keys(error)[0]]?.message;
    if (errorMessage && typeof errorMessage === "string") {
      show(errorMessage, "warn-solid", 3000);
    }
  };

  const getInputBorderColor = () => {
    if (idStatus === "None") {
      return "border-red-600 border-4";
    } else if (idStatus === "Change") {
      return "border-white border-4";
    }
    return "border-green-200 border-4";
  };

  return (
    <div className="mx-auto w-fit mt-[8rem]">
      <form onSubmit={handleSubmit(onSubmit, onFormInValid)}>
        <div className="ml-4">
          <label>이메일</label>
          <div className="flex">
            <Input
              className={cn(
                getInputBorderColor(),
                "w-[13rem] h-[2.6rem] text-black "
              )}>
              <Input.InputForm
                type="email"
                placeholder="사용하실 이메일을 입력해주세요."
                className="px-1 my-1 mr-1 w-[12.5rem] text-[0.85rem]"
                {...register("email", {
                  required: "사용하실 이메일을 입력해주세요.",
                  validate: {
                    notDuplicateCheck: () =>
                      idStatus === "Ok" || "이메일 중복검사를 해주세요."
                  },
                  minLength: {
                    value: 9,
                    message: "올바른 이메일 형식을 넣어주세요"
                  }
                })}
              />
            </Input>
            <Input.SubmitButton
              className="mx-2 px-1 py-[0.3rem] h-fit my-auto text-[0.75rem] bg-blue-300 rounded-md"
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                idDuplicateCheck.mutate(email);
              }}>
              중복검사
            </Input.SubmitButton>
          </div>
          <h2 className="mt-[2rem]">비밀번호</h2>
          <Input>
            <Input.InputInnerBox className="w-[13rem] h-[2.6rem] my-1 text-black">
              <Input.InputForm
                type="password"
                placeholder="사용하실 비밀번호를 입력해주세요."
                className="px-1 my-1 w-[12.5rem] text-[0.85rem]"
                {...register("password", {
                  required: "사용하실 비밀번호를 입력해주세요.",
                  minLength: {
                    value: 8,
                    message: "최소 8글자 이상 입력해주세요."
                  },
                  maxLength: {
                    value: 20,
                    message: "최대 20글자 이하로 입력해주세요."
                  },
                  validate: {
                    passNotSame: () =>
                      passWord === checkPassWord ||
                      "비밀번호가 일치하지 않습니다"
                  }
                })}
              />
            </Input.InputInnerBox>
          </Input>
          <h2>비밀번호 확인</h2>
          <Input className="w-[13rem] h-[2.6rem] my-1 text-black">
            <Input.InputForm
              type="password"
              placeholder="비밀번호를 다시 한번 입력해주세요."
              className="px-1 my-1 w-[12.5rem] text-[0.85rem]"
              onChange={(event) => setCheckPassWord(event.currentTarget.value)}
            />
          </Input>
        </div>
        <div className="flex gap-4 w-fit mx-auto mt-6 mb-2 ">
          <button
            type="submit"
            className="bg-blue-200 px-2 py-1 rounded-md">
            다음으로
          </button>
        </div>
      </form>
    </div>
  );
};
export default SignupForm;
