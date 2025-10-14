import {
  ChevronRight as ChevronRightIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalValue } from "../../Store/Store";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { LanguageToggle } from "../../components/LanguageToggle";
import { VerificationModal } from "../../components/VerificationModal";
import api from "../../Api/Axios";
import { user } from "@heroui/react";

export const Register = () => {
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredUsername, setRegisteredUsername] = useState("");

  const isRTL = i18n.language === "ar";
  const validateForm = React.useCallback(() => {
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = t("firstNameRequired");
    }

    if (!lastName.trim()) {
      newErrors.lastName = t("lastNameRequired");
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = t("phoneRequired");
    } else if (phoneNumber.length !== 10) {
      newErrors.phoneNumber = t("phoneInvalid");
    }

    if (!email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!validateEmail(email)) {
      newErrors.email = t("emailInvalid");
    }

    if (!password.trim()) {
      newErrors.password = t("passwordRequired");
    } else if (!validatePassword(password)) {
      newErrors.password = t("passwordInvalid");
    }

    if (!region) {
      newErrors.region = t("regionRequired");
    }

    if (!city) {
      newErrors.city = t("cityRequired");
    }

    if (!acceptTerms) {
      // This condition remains correct
      newErrors.acceptTerms = t("termsRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    region,
    city,
    acceptTerms,
    t,
  ]);
  // Re-validate when language changes to update error messages
  React.useEffect(() => {
    if (Object.keys(touchedFields).length > 0) {
      validateForm();
    }
  }, [i18n.language, touchedFields, validateForm]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasMinLength = password.length >= 12;

    return hasLowerCase && hasUpperCase && hasSymbols && hasMinLength;
  };

  const handleFieldBlur = (fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
    validateForm();
  };

  const isFormValid = () => {
    return (
      firstName.trim() &&
      lastName.trim() &&
      phoneNumber.trim() &&
      phoneNumber.length === 10 &&
      email.trim() &&
      validateEmail(email) &&
      password.trim() &&
      validatePassword(password) &&
      region &&
      city &&
      acceptTerms
    );
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    var username = firstName + " " + lastName;
    console.log(username);

    dispatch(setGlobalValue({ key: "username", value: username }));
    setRegisteredUsername(username);

    // Mark all fields as touched to show validation errors
    setTouchedFields({
      firstName: true,
      lastName: true,
      phoneNumber: true,
      email: true,
      password: true,
      region: true,
      city: true,
      acceptTerms: true,
    });

    if (validateForm() && acceptTerms) {
      try {
        const payload = {
          username,
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
        };

        const response = await api.post(
          "/auth/register-buyer",
          payload
        );

        console.log("✅ Registration successful:", response.data);

        // Show verification modal after successful registration
        setTimeout(() => {
          setIsSubmitting(false);
          setShowVerificationModal(true);
        }, 500);
      } catch (error) {
        console.error(
          "❌ Registration failed:",
          error.response?.data || error.message
        );
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
      console.log("Validation errors:", errors);
    }
  };

  const navigateToSignIn = () => {
    window.location.href = "/";
  };

  return (
    <div className="bg-[#fefefe] w-full min-h-screen relative overflow-hidden">
      <LanguageToggle />

      <div
        className={`flex flex-col lg:flex-row w-full max-w-[1360px] mx-auto items-center justify-between gap-2 p-4 lg:p-2 min-h-screen ${
          isRTL ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        {/* Image Section */}
        <div
          className={`w-full lg:w-[668px] flex justify-center ${
            isRTL
              ? "lg:justify-end order-1 lg:order-2"
              : "lg:justify-start order-1 lg:order-2"
          }`}
        >
          <div className="relative w-full max-w-[500px] lg:max-w-[668px]">
            <img
              className="w-full h-[450px] sm:h-[600px] lg:h-[950px] xl:h-[1100px] rounded-[30px] lg:rounded-[50px] object-cover"
              alt="Interior design"
              src="/rectangle-1.png"
            />

            {/* Testimonial Card - Positioned relative to image */}
            <Card className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 border-0">
              <CardContent className="flex flex-col items-center justify-center gap-4 lg:gap-6 p-6 lg:p-8 bg-white/75 backdrop-blur-sm rounded-[15px] lg:rounded-[20px] shadow-sm border-0 min-h-[120px] lg:min-h-[160px]">
                <div
                  className={`flex flex-col w-full items-center justify-center gap-3 lg:gap-4 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  <p
                    className={`text-[#1a1713] text-sm sm:text-base lg:text-lg font-normal leading-relaxed font-['Cairo',Helvetica] ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {t("testimonial")}
                  </p>

                  <div
                    className={`flex flex-row-reverse w-full items-center justify-between `}
                  >
                    {/* Navigation Buttons */}

                    <div
                      className={`flex items-center gap-2.5 md:gap-4 lg:gap-6 ${
                        isRTL ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      <div className="p-[1px] rounded-full bg-gradient-to-l from-[#805b3c] to-[#d3baa4]">
                        <Button
                          variant="outline"
                          size="icon"
                          className="flex w-8 h-8 lg:w-12 lg:h-12 items-center justify-center 
                                  rounded-full bg-white/75 hover:bg-white/90 transition"
                        >
                          <HiOutlineArrowRight className="w-6 h-6 lg:w-6 lg:h-6 text-[#904803]" />
                        </Button>
                      </div>

                      <div className="p-[1px] rounded-full bg-gradient-to-r from-[#805b3c] to-[#d3baa4]">
                        <Button
                          variant="outline"
                          size="icon"
                          className="flex w-8 h-8 lg:w-12 lg:h-12 items-center justify-center 
                                  rounded-full bg-white/75 hover:bg-white/90 transition"
                        >
                          <HiOutlineArrowLeft className="w-6 h-6 lg:w-6 lg:h-6 text-[#904803]" />
                        </Button>
                      </div>
                    </div>

                    {/* User Info */}

                    <div
                      className={`inline-flex flex-row-reverse items-center gap-2`}
                    >
                      <div
                        className={`flex flex-col gap-1 ${
                          isRTL ? "items-start" : "items-start"
                        }`}
                      >
                        <p
                          className={`font-medium text-[#3b3b3b] text-xs sm:text-sm lg:text-base leading-tight font-['Cairo',Helvetica] ${
                            isRTL ? "text-right" : "text-left"
                          }`}
                        >
                          {t("userName")}
                        </p>

                        <p
                          className={`font-normal text-[#3b3b3b] text-[10px] sm:text-xs lg:text-sm leading-tight font-['Cairo',Helvetica] ${
                            isRTL ? "text-right" : "text-left"
                          }`}
                        >
                          {t("date")}
                        </p>
                      </div>

                      <Avatar className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8">
                        <AvatarImage src="/ellipse-13.png" alt="User avatar" />

                        <AvatarFallback>تق</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Form Section */}
        <div
          className={`flex flex-col w-full lg:w-[668px] items-center gap-8 lg:gap-20 ${
            isRTL ? "order-1 lg:order-1" : "order-1 lg:order-2"
          }`}
        >
          <div className="flex flex-col w-full max-w-[643px] items-center gap-4 lg:gap-6">
            <h1
              className={`text-2xl sm:text-3xl lg:text-[40px] font-semibold text-[#1a1713] text-center leading-tight font-['Cairo',Helvetica]`}
            >
              {t("welcome")}
            </h1>

            <h2
              className={`text-xl sm:text-2xl lg:text-[32px] font-semibold text-[#835f40] text-center leading-tight font-['Cairo',Helvetica]`}
            >
              {t("createAccount")}
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start gap-6 w-full max-w-[643px]"
          >
            <div className="flex flex-col items-start gap-6 w-full">
              {/* Name Fields Row */}
              <div className="flex gap-4 w-full">
                {/* First Name Field */}
                <div
                  className={`flex flex-col gap-3 w-full ${
                    isRTL ? "items-end" : "items-start"
                  }`}
                >
                  <Label
                    className={`font-medium text-[#1a1713] text-lg lg:text-[20px] font-['Cairo',Helvetica] ${
                      isRTL ? "text-right w-full" : "text-left w-full"
                    }`}
                  >
                    {t("firstName")}
                  </Label>

                  <Input
                    type="text"
                    placeholder={t("firstNamePlaceholder")}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onBlur={() => handleFieldBlur("firstName")}
                    className={`h-12 lg:h-14 px-4 py-2 w-full rounded-[10px] border border-solid focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] placeholder:text-[#999] ${
                      errors.firstName && touchedFields.firstName
                        ? "border-red-500"
                        : "border-[#c3c3c3]"
                    } ${isRTL ? "text-right" : "text-left"}`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                  {errors.firstName && touchedFields.firstName && (
                    <p
                      className={`text-red-500 text-sm mt-1 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name Field */}
                <div
                  className={`flex flex-col gap-3 w-full ${
                    isRTL ? "items-end" : "items-start"
                  }`}
                >
                  <Label
                    className={`font-medium text-[#1a1713] text-lg lg:text-[20px] font-['Cairo',Helvetica] ${
                      isRTL ? "text-right w-full" : "text-left w-full"
                    }`}
                  >
                    {t("lastName")}
                  </Label>

                  <Input
                    type="text"
                    placeholder={t("lastNamePlaceholder")}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onBlur={() => handleFieldBlur("lastName")}
                    className={`h-12 lg:h-14 px-4 py-2 w-full rounded-[10px] border border-solid focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] placeholder:text-[#999] ${
                      errors.lastName && touchedFields.lastName
                        ? "border-red-500"
                        : "border-[#c3c3c3]"
                    } ${isRTL ? "text-right" : "text-left"}`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                  {errors.lastName && touchedFields.lastName && (
                    <p
                      className={`text-red-500 text-sm mt-1 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number Field */}
              <div
                className={`flex flex-col gap-3 w-full ${
                  isRTL ? "items-end" : "items-start"
                }`}
              >
                <Label
                  className={`font-medium text-[#1a1713] text-lg lg:text-[20px] font-['Cairo',Helvetica] ${
                    isRTL ? "text-right w-full" : "text-left w-full"
                  }`}
                >
                  {t("phoneNumber")}
                </Label>

                <div
                  className={`flex h-12 lg:h-14 items-center gap-2 px-4 py-2 w-full rounded-[10px] border border-solid ${
                    errors.phoneNumber && touchedFields.phoneNumber
                      ? "border-red-500"
                      : "border-[#c3c3c3]"
                  } ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      isRTL ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <span className="text-[#292929] text-sm font-['Cairo',Helvetica]">
                      +966
                    </span>
                    <div className="w-px h-8 bg-[#c3c3c3]"></div>
                  </div>
                  <Input
                    type="text"
                    value={phoneNumber}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => {
                      const onlyDigits = e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 10);
                      setPhoneNumber(onlyDigits);
                    }}
                    onBlur={() => handleFieldBlur("phoneNumber")}
                    className={`flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
                {errors.phoneNumber && touchedFields.phoneNumber && (
                  <p
                    className={`text-red-500 text-sm mt-1 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div
                className={`flex flex-col gap-3 w-full ${
                  isRTL ? "items-end" : "items-start"
                }`}
              >
                <Label
                  className={`font-medium text-[#1a1713] text-lg lg:text-[20px] font-['Cairo',Helvetica] ${
                    isRTL ? "text-right w-full" : "text-left w-full"
                  }`}
                >
                  {t("email")}
                </Label>

                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleFieldBlur("email")}
                  className={`h-12 lg:h-14 px-4 py-2 w-full rounded-[10px] border border-solid focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] placeholder:text-[#999] ${
                    errors.email && touchedFields.email
                      ? "border-red-500"
                      : "border-[#c3c3c3]"
                  } ${isRTL ? "text-right" : "text-left"}`}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                {errors.email && touchedFields.email && (
                  <p
                    className={`text-red-500 text-sm mt-1 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div
                className={`flex flex-col gap-3 w-full ${
                  isRTL ? "items-end" : "items-start"
                }`}
              >
                <Label
                  className={`font-medium text-[#1a1713] text-lg lg:text-[20px] font-['Cairo',Helvetica] ${
                    isRTL ? "text-right w-full" : "text-left w-full"
                  }`}
                >
                  {t("password")}
                </Label>

                <div
                  className={`flex h-12 lg:h-14 items-center gap-2 px-4 py-2 w-full rounded-[10px] border border-solid ${
                    errors.password && touchedFields.password
                      ? "border-red-500"
                      : "border-[#c3c3c3]"
                  } ${isRTL ? "flex-row" : "flex-row-reverse"}`}
                >
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("passwordPlaceholder")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleFieldBlur("password")}
                    className={`flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] placeholder:text-[#999] ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#666]" />
                    ) : (
                      <EyeIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#666]" />
                    )}
                  </button>
                </div>
                {errors.password && touchedFields.password && (
                  <p
                    className={`text-red-500 text-sm mt-1 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Region and City Fields Row */}
              <div className="flex gap-4 w-full">
                {/* Region Field */}
                <div
                  className={`flex flex-col gap-3 w-full ${
                    isRTL ? "items-end" : "items-start"
                  }`}
                >
                  <Label
                    className={`font-medium text-[#1a1713] text-lg lg:text-[20px] font-['Cairo',Helvetica] ${
                      isRTL ? "text-right w-full" : "text-left w-full"
                    }`}
                  >
                    {t("region")}
                  </Label>

                  <div
                    className={`flex h-12 lg:h-14 items-center gap-2 px-4 py-2 w-full rounded-[10px] border border-solid border-[#c3c3c3] ${
                      isRTL ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className={`flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] appearance-none ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      <option value="">{t("selectRegion")}</option>
                      <option value="riyadh">{t("riyadh")}</option>
                      <option value="makkah">{t("makkah")}</option>
                      <option value="eastern">{t("eastern")}</option>
                    </select>
                    <ChevronDownIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#666]" />
                  </div>
                  {errors.region && touchedFields.region && (
                    <p
                      className={`text-red-500 text-sm mt-1 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {errors.region}
                    </p>
                  )}
                </div>

                {/* City Field */}
                <div
                  className={`flex flex-col gap-3 w-full ${
                    isRTL ? "items-end" : "items-start"
                  }`}
                >
                  <Label
                    className={`font-medium text-[#1a1713] text-lg lg:text-[20px] font-['Cairo',Helvetica] ${
                      isRTL ? "text-right w-full" : "text-left w-full"
                    }`}
                  >
                    {t("city")}
                  </Label>

                  <div
                    className={`flex h-12 lg:h-14 items-center gap-2 px-4 py-2 w-full rounded-[10px] border border-solid border-[#c3c3c3] ${
                      isRTL ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] appearance-none ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      <option value="">{t("selectCity")}</option>
                      <option value="riyadh-city">{t("riyadhCity")}</option>
                      <option value="jeddah">{t("jeddah")}</option>
                      <option value="dammam">{t("dammam")}</option>
                    </select>
                    <ChevronDownIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#666]" />
                  </div>
                  {errors.city && touchedFields.city && (
                    <p
                      className={`text-red-500 text-sm mt-1 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {errors.city}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div
                className={`flex items-start gap-3 w-full ${
                  isRTL ? "flex-row" : "flex-row"
                }`}
              >
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                  }}
                  className=" w-4 h-4 text-[#835f40] bg-gray-100 border-gray-300 rounded focus:ring-[#835f40] focus:ring-2"
                />
                <label
                  htmlFor="terms"
                  className={`text-xs text-[#666] font-['Cairo',Helvetica] cursor-pointer ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("termsAndConditions")}
                </label>
              </div>

              {/* Terms and Conditions Error */}
              {errors.acceptTerms && touchedFields.acceptTerms && (
                <p
                  className={`text-red-500 text-sm ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("termsRequired")}
                </p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-12 lg:h-14 text-white font-bold text-lg font-['Cairo',Helvetica] rounded-[10px] transition-all duration-200 border-0 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:bg-[linear-gradient(270deg,rgba(128,91,60,0.9)_0%,rgba(211,186,164,0.9)_100%)]"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t("createAccountButton")}...</span>
                  </div>
                ) : (
                  t("createAccountButton")
                )}
              </Button>

              {/* Sign In Link */}
              <div
                className={`flex items-center gap-2 w-full justify-center text-sm font-['Cairo',Helvetica]`}
              >
                <span className="text-[#666]">{t("haveAccount")}</span>
                <button
                  type="button"
                  onClick={navigateToSignIn}
                  className="text-[#835f40] hover:text-[#6b4a32] underline font-medium transition-colors"
                >
                  {t("signIn")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        email={email}
        username={registeredUsername}
        verificationType="registration"
      />
    </div>
  );
};
