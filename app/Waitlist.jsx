"use client"
import { Zap, CheckCircle, Mail, ArrowRight, X, LucideIcon } from 'lucide-react';
import React , {useState , useCallback , useMemo , forwardRef} from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

/*)
*/
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// for the Button
export const Button = forwardRef(({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-lg';
  
  const sizeClasses = {
    default: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-lg',
    icon: 'h-12 w-12',
  };

  const variantClasses = {
    primary: 'bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-500/50 focus:ring-offset-zinc-900',
    // Secondary color updated to #1652f0
    secondary: 'bg-[#1652f0] text-white hover:bg-[#1a5af5] focus:ring-[#1652f0]/50 focus:ring-offset-zinc-900',
  };

  return (
    <button
      ref={ref}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    {...props}
    >
      {children}
    </button>
  );
})

const Input = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={`flex h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-base text-white placeholder:text-zinc-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-200 shadow-inner ${className}`}
    ref={ref}
      {...props}
    />
  );
});
//Input.displayName = "Input";

// for the waitlist
export const WaitlistForm = ({ onSuccess, onError }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const isValidEmail = useMemo(() => {
    // Basic email regex validation
    return /\S+@\S+\.\S+/.test(email);
  }, [email]);

  const handleSubmit =  useCallback(async(e) => {
    e.preventDefault();
    if (!isValidEmail || status === 'submitting') return;

    setStatus('submitting');
    console.log('Submitting email:', email);
    // try getting the api 
 
    try {
   
     const {data , error} = await supabase.from('waitlist').insert({emails: email})
        setStatus('success')
        if(error){
          setStatus('error')
        }
        console.log(data)
        console.log('this is the success')
        onSuccess(email)
        console.log(error?.message)
      
       
    } catch (error) {
        setStatus('error')
        console.log(error)
        console.log(error?.message)
        onError(error?.message)
    }
    /*

    // Simulate an API call
    setTimeout(() => {
      try {
         
        // Mock successful submission 90% of the time
        if (Math.random() < 0.9) {
          setStatus('success');
          onSuccess(email);
        } else {
          throw new Error("Server error occurred.");
        }
      } catch (error) {
        // We cast the error to string for safety in the catch block
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        console.error('Submission failed:', errorMessage);
        setStatus('error');
        onError(errorMessage);
      }
    }, 1500);
    */
  }, [email, isValidEmail, status, onSuccess, onError]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4" action="https://getlaunchlist.com/s/6FBtCC">
      <div className="flex flex-col sm:flex-row gap-3">
      
        <Input
          type="email"
          placeholder="Your professional email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'submitting'}
         className="flex-grow"
        />
        
      
        <Button
          type="submit"
          disabled={!isValidEmail || status === 'submitting'}
          className="w-full sm:w-auto min-w-[120px] shadow-sky-500/50"
        >
          {status === 'submitting' ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-r-transparent border-white"></div>
          ) : (
            <>
              Join the list 
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
