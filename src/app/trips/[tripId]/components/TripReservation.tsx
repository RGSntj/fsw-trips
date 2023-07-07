"use client";

import { Button } from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";

import { Controller, useForm } from "react-hook-form";

interface Props {
  trip: Trip;
}

interface FormData {
  startDate: Date | null;
  endDate: Date | null;
  guests: number;
}

export function TripReservation({ trip }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>();

  function onSubmit(data: any) {
    console.log({ data });
  }

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <Controller
          name="startDate"
          rules={{
            required: { value: true, message: "Data inicial é obrigatória." },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Data de Início"
              error={!!errors.startDate}
              errorMessage={errors.startDate?.message}
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
            />
          )}
        />

        <Controller
          name="endDate"
          rules={{
            required: { value: true, message: "Data final é obrigatória." },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Data Final"
              error={!!errors.endDate}
              errorMessage={errors.endDate?.message}
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
            />
          )}
        />
      </div>

      <Input
        {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório.",
          },
        })}
        placeholder={`Número de hóspedes (max: ${trip.maxGuests.toString()})`}
        className="mt-4"
        error={!!errors?.guests}
        errorMessage={errors.guests?.message}
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total: </p>
        <p className="font-medium text-sm text-primaryDarker">R$2500</p>
      </div>

      <div className="pb-10 border-b border-grayLighter w-full">
        <Button
          onClick={() => handleSubmit(onSubmit)()}
          className="mt-4 w-full"
        >
          Reservar agora
        </Button>
      </div>
    </div>
  );
}
