<?php
namespace Spec\DashboardHub\Bundle\AppBundle\Form;

use DashboardHub\Bundle\AppBundle\Entity\Dashboard;
use DashboardHub\Bundle\AppBundle\Entity\User;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class SearchTypeSpec extends ObjectBehavior
{

    function it_is_initializable()
    {
        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\Form\SearchType');
    }

    function it_should_get_name()
    {
        $this->getName()->shouldReturn('search');
    }

    function it_should_set_default_options(OptionsResolverInterface $resolver)
    {
        $resolver
            ->setDefaults(
                array(
                    'data_class' => 'DashboardHub\Bundle\AppBundle\Entity\Search'
                )
            )
            ->shouldBeCalled();
        $this->setDefaultOptions($resolver);
    }

    function it_should_build_form(FormBuilderInterface $builder)
    {
        $builder
            ->add('query', null,
                  array(
                      'attr' => array(
                          'placeholder' => 'Search Dashboards',
                      ),
                      'label' => false
                  )
            )
            ->shouldBeCalled()
            ->willReturn($builder);
        $builder
            ->add(
                'search',
                'submit',
                array('label' => 'Go')
            )
            ->shouldBeCalled()
            ->willReturn($builder);

        $this->buildForm($builder, array());
    }
}
